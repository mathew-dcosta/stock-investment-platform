import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/angular/standalone';

import { BadgeComponent } from '../badge/badge.component';
import { BadgeType } from '../../models';
import { CurrencyPipe } from '@angular/common';

export enum CardVariant {
  DETAILED = 'detailed', // Full width with all data
  COMPACT = 'compact', // Medium size excluding stats
  SUMMARY = 'summary', // Minimal version with symbol/name top, value below
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  standalone: true,
  imports: [
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    BadgeComponent,
    CurrencyPipe,
  ],
})
export class CardComponent implements OnInit {
  @Input() variant: CardVariant = CardVariant.DETAILED;
  @Input() type: BadgeType = BadgeType.STOCK;

  @Input() symbol: string = '';
  @Input() fullName: string = '';
  @Input() logo: string = '';
  @Input() volume: number = 0;
  @Input() marketCap: number = 0;
  @Input() ask: number = 0;
  @Input() open: number = 0;
  @Input() close: number = 0;
  @Input() high: number = 0;
  @Input() low: number = 0;

  @Output() cardClick = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  onCardClick(): void {
    this.cardClick.emit(this.symbol);
  }

  formatLargeNumber(value: number): string {
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(1)}b`;
    } else if (value >= 1_000_000) {
      return `$${(value / 1_000_000).toFixed(1)}m`;
    } else if (value >= 1_000) {
      return `$${(value / 1_000).toFixed(1)}k`;
    }
    return `$${value.toFixed(2)}`;
  }

  get priceRange(): string {
    return `$${this.low.toFixed(0)}-${this.high.toFixed(0)}`;
  }
}
