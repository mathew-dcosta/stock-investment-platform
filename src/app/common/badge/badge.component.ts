import { Component, Input, OnInit } from '@angular/core';

import { BadgeType } from '../../models';
import { IonBadge } from '@ionic/angular/standalone';

interface BadgeConfig {
  text: string;
  class: string;
}

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  standalone: true,
  imports: [IonBadge],
})
export class BadgeComponent implements OnInit {
  @Input() type: BadgeType = BadgeType.STOCK;

  private badgeConfig: Record<BadgeType, BadgeConfig> = {
    stock: { text: 'Stock', class: 'stock-badge' },
    etf: { text: 'ETF', class: 'etf-badge' },
  };

  constructor() {}

  ngOnInit() {}

  get badgeClass(): string {
    return this.badgeConfig[this.type]?.class || 'default-badge';
  }

  get badgeText(): string {
    return this.badgeConfig[this.type]?.text || this.type.toUpperCase();
  }
}
