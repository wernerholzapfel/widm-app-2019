import {inject, TestBed} from '@angular/core/testing';

import {IntroGuard} from './intro.guard';

describe('IntroGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
    providers: [IntroGuard],
    teardown: { destroyAfterEach: false }
});
    });

    it('should ...', inject([IntroGuard], (guard: IntroGuard) => {
        expect(guard).toBeTruthy();
    }));
});
