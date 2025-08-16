import { TestBed } from '@angular/core/testing';

import { DadosHistoricoFacturaService } from './dados-historico-factura.service';

describe('DadosHistoricoFacturaService', () => {
  let service: DadosHistoricoFacturaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosHistoricoFacturaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
