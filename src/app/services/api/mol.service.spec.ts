import { TestBed } from '@angular/core/testing';

import { KandidatenService } from './kandidaten.service';

describe('MolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KandidatenService = TestBed.get(KandidatenService);
    expect(service).toBeTruthy();
  });
});
