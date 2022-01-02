import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdddeelnemerComponent } from './adddeelnemer.component';

describe('AdddeelnemerComponent', () => {
  let component: AdddeelnemerComponent;
  let fixture: ComponentFixture<AdddeelnemerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [AdddeelnemerComponent],
    teardown: { destroyAfterEach: false }
})
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddeelnemerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
