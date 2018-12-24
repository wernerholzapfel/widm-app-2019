import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VoorspellingPuntenItemComponent} from './voorspelling-punten-item.component';

describe('VoorspellingPuntenItemComponent', () => {
    let component: VoorspellingPuntenItemComponent;
    let fixture: ComponentFixture<VoorspellingPuntenItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VoorspellingPuntenItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(VoorspellingPuntenItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
