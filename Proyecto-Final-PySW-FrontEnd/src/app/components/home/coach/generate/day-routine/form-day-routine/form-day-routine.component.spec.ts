import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDayRoutineComponent } from './form-day-routine.component';

describe('FormDayRoutineComponent', () => {
  let component: FormDayRoutineComponent;
  let fixture: ComponentFixture<FormDayRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDayRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDayRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
