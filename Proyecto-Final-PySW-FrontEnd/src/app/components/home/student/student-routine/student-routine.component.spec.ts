import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentRoutineComponent } from './student-routine.component';

describe('StudentRoutineComponent', () => {
  let component: StudentRoutineComponent;
  let fixture: ComponentFixture<StudentRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
