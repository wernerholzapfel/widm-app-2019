import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PuntenComponent } from './punten.component';

describe('PuntenComponent', () => {
  let component: PuntenComponent;
  let fixture: ComponentFixture<PuntenComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [PuntenComponent],
    teardown: { destroyAfterEach: false }
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
