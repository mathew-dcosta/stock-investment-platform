import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalController, ToastController } from '@ionic/angular/standalone';

import { DetailsService } from '../services/details.service';
import { HoldingsService } from '../services/holdings.service';
import { InvestPage } from './invest.page';
import { PricingService } from '../services/pricing.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('InvestPage', () => {
  let component: InvestPage;
  let fixture: ComponentFixture<InvestPage>;
  let mockDetailsService: jasmine.SpyObj<DetailsService>;
  let mockPricingService: jasmine.SpyObj<PricingService>;

  beforeEach(async () => {
    const detailsServiceSpy = jasmine.createSpyObj('DetailsService', [
      'getAllDetails',
    ]);
    const pricingServiceSpy = jasmine.createSpyObj('PricingService', [
      'getAllPricing',
    ]);
    const holdingsServiceSpy = jasmine.createSpyObj('HoldingsService', [
      'getHoldingsByUserId',
    ]);

    // Setup default mock returns before TestBed configuration
    detailsServiceSpy.getAllDetails.and.returnValue(of([]));
    pricingServiceSpy.getAllPricing.and.returnValue(of([]));
    holdingsServiceSpy.getHoldingsByUserId.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [InvestPage],
      providers: [
        { provide: DetailsService, useValue: detailsServiceSpy },
        { provide: PricingService, useValue: pricingServiceSpy },
        { provide: HoldingsService, useValue: holdingsServiceSpy },
        { provide: ModalController, useValue: {} },
        { provide: ToastController, useValue: {} },
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvestPage);
    component = fixture.componentInstance;

    mockDetailsService = TestBed.inject(
      DetailsService
    ) as jasmine.SpyObj<DetailsService>;
    mockPricingService = TestBed.inject(
      PricingService
    ) as jasmine.SpyObj<PricingService>;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should combine details and pricing data in getTrendingStocks', (done) => {
    const mockDetails = [
      {
        id: '1',
        symbol: 'AAPL',
        type: 'stock' as any,
        fullName: 'Apple',
        logo: '',
        volume: 1000,
        marketCap: 1000000,
      },
    ];
    const mockPricing = [
      {
        id: '1',
        symbol: 'AAPL',
        open: 149,
        close: 150,
        ask: 150.25,
        low: 148,
        high: 152,
      },
    ];

    mockDetailsService.getAllDetails.and.returnValue(of(mockDetails));
    mockPricingService.getAllPricing.and.returnValue(of(mockPricing));

    component['getTrendingStocks']().subscribe((stocks) => {
      expect(stocks[0].ask).toBe(150.25);
      expect(stocks[0].symbol).toBe('AAPL');
      done();
    });
  });
});
