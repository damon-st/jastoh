import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductopruebaComponent } from './productoprueba.component';

describe('ProductopruebaComponent', () => {
  let component: ProductopruebaComponent;
  let fixture: ComponentFixture<ProductopruebaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductopruebaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductopruebaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
