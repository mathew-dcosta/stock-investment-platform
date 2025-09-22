import { API_CONFIG } from '../config/api.config';
import { CompanyDetails } from '../models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  private readonly API_BASE_URL = API_CONFIG.BASE_URL;
  private readonly ENDPOINT = API_CONFIG.ENDPOINTS.DETAILS;

  constructor(private http: HttpClient) {}

  /**
   * Get all company details
   * @returns Observable of all company details
   */
  getAllDetails(): Observable<CompanyDetails[]> {
    return this.http.get<CompanyDetails[]>(
      `${this.API_BASE_URL}${this.ENDPOINT}`
    );
  }
}
