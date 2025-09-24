import { BehaviorSubject, Observable, of } from 'rxjs';
import { CompanyDetails, Holding, PricingData } from '../models';

import { Injectable } from '@angular/core';
import detailsData from '../../mock-data/details.json';
import holdingsData from '../../mock-data/holdings.json';
import { map } from 'rxjs/operators';
import pricingData from '../../mock-data/pricing.json';

// Import mock data from JSON files

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  // Use BehaviorSubject to maintain state for holdings (as they can be modified)
  private holdingsSubject = new BehaviorSubject<Holding[]>(
    holdingsData.holdings
  );

  constructor() {}

  getAllPricing(): Observable<PricingData[]> {
    return of(pricingData.pricing);
  }

  getAllDetails(): Observable<CompanyDetails[]> {
    return of(detailsData.details as CompanyDetails[]);
  }

  getHoldingsByUserId(userId: string): Observable<Holding[]> {
    return this.holdingsSubject
      .asObservable()
      .pipe(
        map((holdings) =>
          holdings.filter((holding) => holding.userId === userId)
        )
      );
  }

  addHolding(holding: Omit<Holding, 'id'>): Observable<Holding> {
    const newHolding: Holding = {
      ...holding,
      id: `holding-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    };

    const currentHoldings = this.holdingsSubject.value;
    const updatedHoldings = [...currentHoldings, newHolding];
    this.holdingsSubject.next(updatedHoldings);

    return of(newHolding);
  }
}
