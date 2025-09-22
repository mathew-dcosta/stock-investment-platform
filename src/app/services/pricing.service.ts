import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PricingData } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PricingService {
  private readonly API_BASE_URL = API_CONFIG.BASE_URL;
  private readonly ENDPOINT = API_CONFIG.ENDPOINTS.PRICING;

  constructor(private http: HttpClient) {}

  /**
   * Get all pricing data
   * @returns Observable of all pricing data
   */
  getAllPricing(): Observable<PricingData[]> {
    return this.http.get<PricingData[]>(`${this.API_BASE_URL}${this.ENDPOINT}`);
  }
}
