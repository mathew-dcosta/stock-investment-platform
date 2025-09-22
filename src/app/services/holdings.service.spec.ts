import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { Holding } from '../models';
import { HoldingsService } from './holdings.service';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('HoldingsService', () => {
  let service: HoldingsService;
  let httpMock: HttpTestingController;

  const mockHoldings: Holding[] = [
    {
      id: 'holding-1',
      userId: 'JohnDoe2025',
      symbol: 'AAPL',
      shares: 10,
      purchasePrice: 150.0,
      purchaseDate: '20-08-2025',
    },
    {
      id: 'holding-2',
      userId: 'JohnDoe2025',
      symbol: 'GOOGL',
      shares: 5,
      purchasePrice: 2500.0,
      purchaseDate: '15-07-2025',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HoldingsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(HoldingsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get holdings by user ID', () => {
    const userId = 'JohnDoe2025';

    service.getHoldingsByUserId(userId).subscribe((holdings) => {
      expect(holdings).toEqual(mockHoldings);
      expect(holdings.length).toBe(2);
    });

    const req = httpMock.expectOne('http://localhost:3001/holdings');
    expect(req.request.method).toBe('GET');
    req.flush(mockHoldings);
  });
});
