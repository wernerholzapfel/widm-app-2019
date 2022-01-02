import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddpoulesComponent } from './addpoules.component';

describe('AddpoulesComponent', () => {
  let component: AddpoulesComponent;
  let fixture: ComponentFixture<AddpoulesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AddpoulesComponent],
    teardown: { destroyAfterEach: false }
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
