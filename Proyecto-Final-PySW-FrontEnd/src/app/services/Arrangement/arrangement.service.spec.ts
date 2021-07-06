import { TestBed } from '@angular/core/testing';

import { ArrangementService } from './arrangement.service';

describe('ArrangementService', () => {
  let service: ArrangementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArrangementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
