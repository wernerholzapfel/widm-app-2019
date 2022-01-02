import {TestBed} from '@angular/core/testing';

import {PouleHelperService} from './poule-helper.service';

describe('PouleHelperService', () => {
    beforeEach(() => TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } }));

    it('should be created', () => {
        const service: PouleHelperService = TestBed.get(PouleHelperService);
        expect(service).toBeTruthy();
    });
});
