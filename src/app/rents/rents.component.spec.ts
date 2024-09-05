import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentsComponent } from './rents.component';

describe('RentsComponent', () => {
  let component: RentsComponent;
  let fixture: ComponentFixture<RentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentsComponent]
    });
    fixture = TestBed.createComponent(RentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
