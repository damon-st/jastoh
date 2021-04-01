import { TestBed } from '@angular/core/testing';

import { ComponetsGuard } from './componets.guard';

describe('ComponetsGuard', () => {
  let guard: ComponetsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ComponetsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
