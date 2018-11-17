import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoorspelComponent } from './voorspel.component';

describe('VoorspelComponent', () => {
  let component: VoorspelComponent;
  let fixture: ComponentFixture<VoorspelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoorspelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoorspelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
