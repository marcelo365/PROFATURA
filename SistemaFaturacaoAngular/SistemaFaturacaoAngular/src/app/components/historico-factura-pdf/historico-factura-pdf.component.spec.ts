import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoFacturaPDFComponent } from './historico-factura-pdf.component';

describe('HistoricoFacturaPDFComponent', () => {
  let component: HistoricoFacturaPDFComponent;
  let fixture: ComponentFixture<HistoricoFacturaPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoricoFacturaPDFComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistoricoFacturaPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
