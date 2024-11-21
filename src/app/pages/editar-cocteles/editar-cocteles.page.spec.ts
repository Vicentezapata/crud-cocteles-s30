import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarCoctelesPage } from './editar-cocteles.page';

describe('EditarCoctelesPage', () => {
  let component: EditarCoctelesPage;
  let fixture: ComponentFixture<EditarCoctelesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCoctelesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
