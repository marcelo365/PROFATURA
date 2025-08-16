import { TestBed } from '@angular/core/testing';

import { FacturaPDFService } from './factura-pdf.service';

describe('FacturaPDFService', () => {
  let service: FacturaPDFService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturaPDFService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
