import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {VoorspellingsscoreComponent} from './voorspellingsscore.component';

describe('VoorspellingsscoreComponent', () => {
    let component: VoorspellingsscoreComponent;
    let fixture: ComponentFixture<VoorspellingsscoreComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [VoorspellingsscoreComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VoorspellingsscoreComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
