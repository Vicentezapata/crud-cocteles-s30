import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarCoctelesPage } from './listar-cocteles.page';

describe('ListarCoctelesPage', () => {
  let component: ListarCoctelesPage;
  let fixture: ComponentFixture<ListarCoctelesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCoctelesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
