import { TestBed } from '@angular/core/testing';

import { ObWorkTimesService } from './ob-work-times.service';

describe('ObWorkTimesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObWorkTimesService = TestBed.get(ObWorkTimesService);
    expect(service).toBeTruthy();
  });
});
