import { TestBed } from '@angular/core/testing';

import { UitnodigingenService } from './uitnodigingen.service';

describe('UitnodigingenService', () => {
  beforeEach(() => TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } }));

  it('should be created', () => {
    const service: UitnodigingenService = TestBed.get(UitnodigingenService);
    expect(service).toBeTruthy();
  });
});
