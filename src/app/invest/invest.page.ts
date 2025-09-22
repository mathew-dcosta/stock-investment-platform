import { BadgeType, Holding } from '../models';
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
  public selectedStock: any = null;

  public trendingStocks: Array<{
    currentPrice: number;
    id: string;
    symbol: string;
    type: BadgeType;
    fullName: string;
    logo: string;
    volume: number;
    marketCap: number;
    ask: number;
    low: number;
    high: number;
  }> = [];

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
    console.log('Card clicked, symbol:', symbol);
    // Set selected stock for modal context
    this.selectedStock = this.trendingStocks.find(
      (stock) => stock.symbol === symbol
    );
    // Reset form values
    this.formAmount = null;
    this.formShares = null;
  }

  onBuy() {
    if (this.selectedStock && this.formShares && this.formShares > 0) {
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
        error: (error) => {
          console.error('Error saving holding:', error);
        },
      });
    }
  }

  private async showToast() {
    const toast = await this.toastController.create({
      message: `${this.selectedStock.symbol} successfully purchased!`,
      duration: 3000,
      position: 'top',
      color: 'success',
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
    ]).subscribe(([holdings, pricing]) => {
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

      // Update the signal with new holdings data
      this.holdings.set(holdingsWithPricing);
    });
  }

  private getTrendingStocksData() {
    this.getTrendingStocks().subscribe((stocks) => {
      this.trendingStocks = stocks;
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
