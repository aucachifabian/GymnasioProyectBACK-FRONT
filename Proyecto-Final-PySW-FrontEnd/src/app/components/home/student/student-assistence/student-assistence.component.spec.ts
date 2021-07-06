import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssistenceComponent } from './student-assistence.component';

describe('StudentAssistenceComponent', () => {
  let component: StudentAssistenceComponent;
  let fixture: ComponentFixture<StudentAssistenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAssistenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssistenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
