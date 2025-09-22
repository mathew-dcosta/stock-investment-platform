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

import { Component } from '@angular/core';

// Extended holding interface with calculated values
interface RecentlySearched {
  symbol: string;
  fullName: string;
  amount: number;
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
  ],
})
export class DiscoverPage {
  public recentlySearched: RecentlySearched[] = [];
  InstrumentVariant = InstrumentVariant;
  constructor() {
    this.getRecentlySearched();
  }

  // Simulated fetch for recently searched instruments
  private getRecentlySearched() {
    this.recentlySearched = [
      { symbol: 'AAPL', fullName: 'Apple Inc.', amount: 150.25 },
      { symbol: 'GOOGL', fullName: 'Alphabet Inc.', amount: 2800.5 },
    ];
  }
}
