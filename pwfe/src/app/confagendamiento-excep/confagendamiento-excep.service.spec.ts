import { TestBed } from '@angular/core/testing';

import { ConfagendamientoExcepService } from './confagendamiento-excep.service';

describe('ConfagendamientoExcepService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfagendamientoExcepService = TestBed.get(ConfagendamientoExcepService);
    expect(service).toBeTruthy();
  });
});
