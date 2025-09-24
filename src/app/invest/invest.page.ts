import { BadgeType, Holding, TrendingStock } from '../models';
import { CardComponent, CardVariant } from '../common/card/card.component';
import { Component, computed, signal } from '@angular/core';
import {
  InstrumentComponent,
  InstrumentVariant,
} from '../common/instrument/instrument.component';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToast,
  IonToolbar,
  ModalController,
  ToastController,
} from '@ionic/angular/standalone';
import { combineLatest, map } from 'rxjs';

import { CurrencyPipe } from '@angular/common';
import { DetailsService } from '../services/details.service';
import { FormsModule } from '@angular/forms';
import { HoldingsService } from '../services/holdings.service';
import { PricingService } from '../services/pricing.service';

// Extended holding interface with calculated values
interface HoldingsWithPricing extends Holding {
  currentPrice: number;
  percentageChange: number;
  isPositive: boolean;
}

@Component({
  selector: 'app-invest',
  templateUrl: 'invest.page.html',
  styleUrls: ['invest.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonModal,
    IonButton,
    IonLabel,
    IonInput,
    IonItem,
    CurrencyPipe,
    InstrumentComponent,
    CardComponent,
    FormsModule,
    IonToast,
  ],
  providers: [HoldingsService],
})
export class InvestPage {
  public InstrumentVariant = InstrumentVariant;
  public CardVariant = CardVariant;
  public BadgeType = BadgeType;

  // Convert holdings to a signal
  public holdings = signal<HoldingsWithPricing[]>([]);

  // Error state signals
  public hasError = signal<boolean>(false);
  public errorMessage = signal<string>('Error loading data');

  // Computed signal for total equity
  public totalEquity = computed(() => {
    return this.holdings().reduce((total, holding) => {
      const currentValue = holding.shares * holding.currentPrice;
      return total + currentValue;
    }, 0);
  });

  // Form properties
  public formAmount: number | null = null;
  public formShares: number | null = null;
  public selectedStock: TrendingStock | null = null;

  public trendingStocks: TrendingStock[] = [];

  constructor(
    private holdingsService: HoldingsService,
    private detailsService: DetailsService,
    private pricingService: PricingService,
    private modalController: ModalController,
    private toastController: ToastController
  ) {
    this.loadHoldings();
    this.getTrendingStocksData();
  }

  onCardClicked(symbol: string) {
    this.selectedStock =
      this.trendingStocks.find((stock) => stock.symbol === symbol) || null;
    this.formAmount = null;
    this.formShares = null;
  }

  onBuy() {
    if (!this.selectedStock) {
      this.showErrorToast('Please select a stock to purchase.');
      return;
    }

    if (!this.formShares || this.formShares <= 0) {
      this.showErrorToast('Please enter a valid number of shares.');
      return;
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB');

    const newHolding: Omit<Holding, 'id'> = {
      userId: 'JohnDoe2025',
      symbol: this.selectedStock.symbol,
      shares: this.formShares,
      purchasePrice: this.selectedStock.ask,
      purchaseDate: formattedDate.replace(/\//g, '-'),
    };

    this.holdingsService.addHolding(newHolding).subscribe({
      next: async (response) => {
        await this.showToast();

        this.loadHoldings();
        this.clearForm();

        this.modalController.dismiss();
      },
      error: async (error) => {
        console.error('Error saving holding:', error);
        await this.showErrorToast(
          'Unable to complete purchase. Please try again.'
        );
      },
    });
  }

  private async showToast() {
    const toast = await this.toastController.create({
      message: `${this.selectedStock?.symbol} successfully purchased!`,
      duration: 3000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  private async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 4000,
      position: 'top',
      color: 'danger',
    });
    await toast.present();
  }

  private clearForm() {
    this.formAmount = null;
    this.formShares = null;
    this.selectedStock = null;
  }

  private loadHoldings(): void {
    combineLatest([
      this.holdingsService.getHoldingsByUserId('JohnDoe2025'),
      this.pricingService.getAllPricing(),
    ]).subscribe({
      next: ([holdings, pricing]) => {
        try {
          const holdingsWithPricing = holdings.map((holding) => {
            const currentPriceData = pricing.find(
              (p) => p.symbol === holding.symbol
            );
            const currentPrice = currentPriceData?.ask || holding.purchasePrice;

            // Calculate percentage change from purchase price to current price
            const percentageChange =
              ((currentPrice - holding.purchasePrice) / holding.purchasePrice) *
              100;

            return {
              ...holding,
              currentPrice,
              percentageChange,
              isPositive: percentageChange >= 0,
            };
          });

          this.holdings.set(holdingsWithPricing);
          this.hasError.set(false);
        } catch (error) {
          console.error('Error processing holdings data:', error);
          this.hasError.set(true);
        }
      },
      error: (error) => {
        console.error('Error loading holdings:', error);
        this.hasError.set(true);
      },
    });
  }

  private getTrendingStocksData() {
    this.getTrendingStocks().subscribe({
      next: (stocks) => {
        this.trendingStocks = stocks;
        this.hasError.set(false);
      },
      error: (error) => {
        console.error('Error loading trending stocks:', error);
        this.hasError.set(true);
      },
    });
  }

  private getTrendingStocks() {
    return combineLatest([
      this.detailsService.getAllDetails(),
      this.pricingService.getAllPricing(),
    ]).pipe(
      map(([details, pricing]) => {
        return details.map((detail) => {
          const priceInfo = pricing.find((p) => p.symbol === detail.symbol);
          return {
            ...detail,
            currentPrice: priceInfo ? priceInfo.ask : 0,
            ask: priceInfo ? priceInfo.ask : 0,
            low: priceInfo ? priceInfo.low : 0,
            high: priceInfo ? priceInfo.high : 0,
          };
        });
      })
    );
  }
}
