import { TestBed } from '@angular/core/testing';

import { FacturasProdutosService } from './facturas-produtos.service';

describe('FacturasProdutosService', () => {
  let service: FacturasProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturasProdutosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
