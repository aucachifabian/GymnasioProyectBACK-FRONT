import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormArrangementComponent } from './form-arrangement.component';

describe('FormArrangementComponent', () => {
  let component: FormArrangementComponent;
  let fixture: ComponentFixture<FormArrangementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormArrangementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormArrangementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
