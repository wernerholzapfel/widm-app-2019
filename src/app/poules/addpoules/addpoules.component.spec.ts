import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpoulesComponent } from './addpoules.component';

describe('AddpoulesComponent', () => {
  let component: AddpoulesComponent;
  let fixture: ComponentFixture<AddpoulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpoulesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpoulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
