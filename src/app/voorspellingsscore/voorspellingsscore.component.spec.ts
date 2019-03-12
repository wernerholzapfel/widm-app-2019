import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VoorspellingsscoreComponent} from './voorspellingsscore.component';

describe('VoorspellingsscoreComponent', () => {
    let component: VoorspellingsscoreComponent;
    let fixture: ComponentFixture<VoorspellingsscoreComponent>;

    beforeEach(async(() => {
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
