import { CardComponent, CardVariant } from '../common/card/card.component';
import {
  InstrumentComponent,
  InstrumentVariant,
} from '../common/instrument/instrument.component';
import {
  IonContent,
  IonHeader,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

import { BadgeType } from '../models';
import { Component } from '@angular/core';

interface RecentlySearched {
  symbol: string;
  fullName: string;
  amount: number;
}

interface FeaturedStock {
  symbol: string;
  fullName: string;
  logo: string;
  type: BadgeType;
  ask: number;
  volume: number;
  marketCap: number;
  open: number;
  close: number;
  high: number;
  low: number;
}

@Component({
  selector: 'app-discover',
  templateUrl: 'discover.page.html',
  styleUrls: ['discover.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    InstrumentComponent,
    CardComponent,
  ],
})
export class DiscoverPage {
  public recentlySearched: RecentlySearched[] = [];
  public featuredStocks: FeaturedStock[] = [];

  public InstrumentVariant = InstrumentVariant;
  public CardVariant = CardVariant;
  public BadgeType = BadgeType;

  constructor() {
    this.getRecentlySearched();
    this.getFeaturedStock();
  }

  // Simulated fetch for recently searched instruments
  private getRecentlySearched() {
    this.recentlySearched = [
      { symbol: 'AAPL', fullName: 'Apple Inc.', amount: 1128.0 },
      { symbol: 'GOOGL', fullName: 'Alphabet Inc. Class A', amount: 1243.68 },
      { symbol: 'MSFT', fullName: 'Microsoft Corporation', amount: 843.66 },
      { symbol: 'AMZN', fullName: 'Amazon.com, Inc.', amount: 1455.24 },
    ];
  }

  // Featured stock data (simulated)
  private getFeaturedStock() {
    this.featuredStocks = [
      {
        symbol: 'TSLA',
        fullName: 'Tesla, Inc.',
        logo: 'https://github.githubassets.com/images/icons/emoji/unicode/1f697.png?v8',
        type: BadgeType.ETF,
        ask: 1267.01,
        volume: 93897398,
        marketCap: 431042766252,
        open: 1263.61,
        close: 1264.27,
        high: 1273.39,
        low: 1134.51,
      },
      {
        symbol: 'NVDA',
        fullName: 'NVIDIA Corporation',
        logo: 'https://github.githubassets.com/images/icons/emoji/unicode/1f5a5.png?v8',
        type: BadgeType.ETF,
        ask: 821.27,
        volume: 95477396,
        marketCap: 41974577519,
        open: 810.67,
        close: 818.9,
        high: 824.89,
        low: 799.61,
      },
      {
        symbol: 'META',
        fullName: 'Meta Platforms, Inc.',
        logo: 'https://github.githubassets.com/images/icons/emoji/unicode/1f310.png?v8',
        type: BadgeType.ETF,
        ask: 324.24,
        volume: 78204068,
        marketCap: 112540712990,
        open: 323.68,
        close: 323.99,
        high: 328.61,
        low: 320.51,
      },
      {
        symbol: 'NFLX',
        fullName: 'Netflix, Inc.',
        logo: 'https://github.githubassets.com/images/icons/emoji/unicode/1f3a5.png?v8',
        type: BadgeType.STOCK,
        ask: 465.3,
        volume: 14496561,
        marketCap: 1872881026241,
        open: 458.13,
        close: 465.07,
        high: 474.86,
        low: 447.92,
      },
    ];
  }
}
