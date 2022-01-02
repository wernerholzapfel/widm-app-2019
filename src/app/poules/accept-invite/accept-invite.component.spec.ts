import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AcceptInviteComponent } from './accept-invite.component';

describe('AcceptInviteComponent', () => {
  let component: AcceptInviteComponent;
  let fixture: ComponentFixture<AcceptInviteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AcceptInviteComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptInviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
