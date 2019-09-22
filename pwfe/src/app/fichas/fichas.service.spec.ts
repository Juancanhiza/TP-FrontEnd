import { TestBed } from '@angular/core/testing';

import { FichasService } from './fichas.service';

describe('FichasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FichasService = TestBed.get(FichasService);
    expect(service).toBeTruthy();
  });
});
