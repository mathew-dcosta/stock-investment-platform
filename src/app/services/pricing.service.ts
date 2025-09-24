import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { Observable } from 'rxjs';
import { PricingData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  constructor(private mockDataService: MockDataService) {}

  getAllPricing(): Observable<PricingData[]> {
    return this.mockDataService.getAllPricing();
  }
}
