import { TestBed } from '@angular/core/testing';

import { DayRoutineService } from './day-routine.service';

describe('DayRoutineService', () => {
  let service: DayRoutineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DayRoutineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
