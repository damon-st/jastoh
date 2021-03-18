import { TestBed } from '@angular/core/testing';

import { MetasvcService } from './metasvc.service';

describe('MetasvcService', () => {
  let service: MetasvcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetasvcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
