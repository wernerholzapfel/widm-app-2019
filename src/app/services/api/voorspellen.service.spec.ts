import { TestBed } from '@angular/core/testing';

import { VoorspellenService } from './voorspellen.service';

describe('VoorspellenService', () => {
  beforeEach(() => TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } }));

  it('should be created', () => {
    const service: VoorspellenService = TestBed.get(VoorspellenService);
    expect(service).toBeTruthy();
  });
});
