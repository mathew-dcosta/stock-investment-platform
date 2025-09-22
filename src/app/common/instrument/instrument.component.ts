import { Component, Input } from '@angular/core';

import { CurrencyPipe } from '@angular/common';
import { IonItem } from '@ionic/angular/standalone';

export enum InstrumentVariant {
  STOCK = 'stock',
  COMPANY = 'company',
}

@Component({
  selector: 'app-instrument',
  templateUrl: './instrument.component.html',
  styleUrls: ['./instrument.component.scss'],
  standalone: true,
  imports: [IonItem, CurrencyPipe],
})
export class InstrumentComponent {
  @Input() variant: InstrumentVariant = InstrumentVariant.STOCK;
  @Input() symbol: string = '';
  @Input() companyName: string = '';
  @Input() noOfShares: number = 0;
  @Input() amount: number = 0;
  @Input() percentageChange: number = 0;
  @Input() isPositive: boolean = true;

  // Expose enum to template
  InstrumentVariant = InstrumentVariant;

  get formattedPercentage(): string {
    const sign = this.isPositive ? '+' : '';
    return `${sign}${this.percentageChange.toFixed(2)}%`;
  }

  get percentageClass(): string {
    return this.isPositive ? 'positive' : 'negative';
  }
}
