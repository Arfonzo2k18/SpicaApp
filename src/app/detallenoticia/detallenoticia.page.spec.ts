import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallenoticiaPage } from './detallenoticia.page';

describe('DetallenoticiaPage', () => {
  let component: DetallenoticiaPage;
  let fixture: ComponentFixture<DetallenoticiaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallenoticiaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallenoticiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
