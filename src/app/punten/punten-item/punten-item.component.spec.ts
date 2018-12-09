import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntenItemComponent } from './punten-item.component';

describe('PuntenItemComponent', () => {
  let component: PuntenItemComponent;
  let fixture: ComponentFixture<PuntenItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntenItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntenItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
