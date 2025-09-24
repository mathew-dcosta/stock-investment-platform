import { CompanyDetails } from '../models';
import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DetailsService {
  constructor(private mockDataService: MockDataService) {}

  getAllDetails(): Observable<CompanyDetails[]> {
    return this.mockDataService.getAllDetails();
  }
}
