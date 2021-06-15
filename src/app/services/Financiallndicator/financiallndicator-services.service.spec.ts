import { TestBed } from '@angular/core/testing';

import { FinanciallndicatorServicesService } from './financiallndicator-services.service';

describe('FinanciallndicatorServicesService', () => {
  let service: FinanciallndicatorServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanciallndicatorServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
