import { Holding } from '../models';
import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HoldingsService {
  constructor(private mockDataService: MockDataService) {}

  getHoldingsByUserId(userId: string): Observable<Holding[]> {
    return this.mockDataService.getHoldingsByUserId(userId);
  }

  addHolding(holding: Omit<Holding, 'id'>): Observable<Holding> {
    return this.mockDataService.addHolding(holding);
  }
}
