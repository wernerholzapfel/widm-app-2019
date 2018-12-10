import { TestBed } from '@angular/core/testing';

import { DeelnemerService } from './deelnemer.service';

describe('DeelnemerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeelnemerService = TestBed.get(DeelnemerService);
    expect(service).toBeTruthy();
  });
});
