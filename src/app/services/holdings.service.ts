import { API_CONFIG } from '../config/api.config';
import { Holding } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HoldingsService {
  private readonly API_BASE_URL = API_CONFIG.BASE_URL;
  private readonly ENDPOINT = API_CONFIG.ENDPOINTS.HOLDINGS;

  constructor(private http: HttpClient) {}

  /**
   * Get all holdings for a specific user
   * @param userId - The user ID to filter holdings by
   * @returns Observable of user's holdings
   */
  getHoldingsByUserId(userId: string): Observable<Holding[]> {
    return this.http
      .get<Holding[]>(`${this.API_BASE_URL}${this.ENDPOINT}`)
      .pipe(
        map((response) =>
          response.filter((holding) => holding.userId === userId)
        )
      );
  }

  /**
   * Add a new holding
   * @param holding - The holding to add (without ID)
   * @returns Observable of the created holding
   */
  addHolding(holding: Omit<Holding, 'id'>): Observable<Holding> {
    const newHolding = {
      ...holding,
      id: `holding-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };

    return this.http.post<Holding>(
      `${this.API_BASE_URL}${this.ENDPOINT}`,
      newHolding
    );
  }
}
