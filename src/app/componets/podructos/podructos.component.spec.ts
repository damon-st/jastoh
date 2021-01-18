import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodructosComponent } from './podructos.component';

describe('PodructosComponent', () => {
  let component: PodructosComponent;
  let fixture: ComponentFixture<PodructosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodructosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PodructosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
