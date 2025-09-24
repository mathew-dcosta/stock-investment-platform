import { BadgeType } from './badge-type.model';

export interface TrendingStock {
  id: string;
  symbol: string;
  type: BadgeType;
  fullName: string;
  logo: string;
  volume: number;
  marketCap: number;
  currentPrice: number;
  ask: number;
  low: number;
  high: number;
}
