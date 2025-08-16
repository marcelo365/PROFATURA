import { TestBed } from '@angular/core/testing';

import { UtilizadoresService } from './utilizadores.service';

describe('UtilizadoresService', () => {
  let service: UtilizadoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilizadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
