import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PoulesComponent } from './poules.component';

describe('PoulesComponent', () => {
  let component: PoulesComponent;
  let fixture: ComponentFixture<PoulesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [PoulesComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
