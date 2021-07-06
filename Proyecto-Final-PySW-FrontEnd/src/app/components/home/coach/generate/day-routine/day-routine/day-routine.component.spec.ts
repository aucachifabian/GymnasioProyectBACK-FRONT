import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayRoutineComponent } from './day-routine.component';

describe('DayRoutineComponent', () => {
  let component: DayRoutineComponent;
  let fixture: ComponentFixture<DayRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DayRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
