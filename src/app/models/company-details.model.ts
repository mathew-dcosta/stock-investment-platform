import { BadgeType } from './badge-type.model';

export interface CompanyDetails {
  id: string;
  symbol: string;
  type: BadgeType;
  fullName: string;
  logo: string;
  volume: number;
  marketCap: number;
}
