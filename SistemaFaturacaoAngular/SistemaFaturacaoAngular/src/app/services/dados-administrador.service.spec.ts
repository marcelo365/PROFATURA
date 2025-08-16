import { TestBed } from '@angular/core/testing';

import { DadosAdministradorService } from './dados-administrador.service';

describe('DadosAdministradorService', () => {
  let service: DadosAdministradorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosAdministradorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
