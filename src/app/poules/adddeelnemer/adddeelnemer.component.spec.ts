import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddeelnemerComponent } from './adddeelnemer.component';

describe('AdddeelnemerComponent', () => {
  let component: AdddeelnemerComponent;
  let fixture: ComponentFixture<AdddeelnemerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddeelnemerComponent ]
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
