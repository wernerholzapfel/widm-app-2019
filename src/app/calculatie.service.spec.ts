import { TestBed } from '@angular/core/testing';

import { CalculatieService } from './calculatie.service';

describe('CalculatieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalculatieService = TestBed.get(CalculatieService);
    expect(service).toBeTruthy();
  });
});
