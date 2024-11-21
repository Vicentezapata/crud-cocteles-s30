import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarCoctelesPage } from './agregar-cocteles.page';

describe('AgregarCoctelesPage', () => {
  let component: AgregarCoctelesPage;
  let fixture: ComponentFixture<AgregarCoctelesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarCoctelesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
