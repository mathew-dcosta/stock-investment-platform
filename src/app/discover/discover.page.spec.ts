import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverPage } from './discover.page';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('DiscoverPage', () => {
  let component: DiscoverPage;
  let fixture: ComponentFixture<DiscoverPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscoverPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(DiscoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
