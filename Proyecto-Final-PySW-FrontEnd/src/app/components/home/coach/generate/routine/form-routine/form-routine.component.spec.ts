import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRoutineComponent } from './form-routine.component';

describe('FormRoutineComponent', () => {
  let component: FormRoutineComponent;
  let fixture: ComponentFixture<FormRoutineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRoutineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRoutineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
