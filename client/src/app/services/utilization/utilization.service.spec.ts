import { TestBed } from '@angular/core/testing';

import { UtilizationService } from './utilization.service';

describe('UtilizationService', () => {
  let service: UtilizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
