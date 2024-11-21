import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesCoctelesPage } from './detalles-cocteles.page';

describe('DetallesCoctelesPage', () => {
  let component: DetallesCoctelesPage;
  let fixture: ComponentFixture<DetallesCoctelesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesCoctelesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
