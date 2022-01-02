import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VoorspellenComponent } from './voorspellen.component';

describe('VoorspellenComponent', () => {
  let component: VoorspellenComponent;
  let fixture: ComponentFixture<VoorspellenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VoorspellenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoorspellenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
