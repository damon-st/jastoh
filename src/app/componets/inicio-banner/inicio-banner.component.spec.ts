import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioBannerComponent } from './inicio-banner.component';

describe('InicioBannerComponent', () => {
  let component: InicioBannerComponent;
  let fixture: ComponentFixture<InicioBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
