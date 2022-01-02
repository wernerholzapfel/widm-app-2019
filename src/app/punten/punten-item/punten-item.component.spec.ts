import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PuntenItemComponent } from './punten-item.component';

describe('PuntenItemComponent', () => {
  let component: PuntenItemComponent;
  let fixture: ComponentFixture<PuntenItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    declarations: [PuntenItemComponent],
    teardown: { destroyAfterEach: false }
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
