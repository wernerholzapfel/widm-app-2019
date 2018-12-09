import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntenComponent } from './punten.component';

describe('PuntenComponent', () => {
  let component: PuntenComponent;
  let fixture: ComponentFixture<PuntenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuntenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
