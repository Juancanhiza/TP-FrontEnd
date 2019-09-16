import { TestBed } from '@angular/core/testing';

import { ConfagendamientoService } from './confagendamiento.service';

describe('ConfagendamientoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfagendamientoService = TestBed.get(ConfagendamientoService);
    expect(service).toBeTruthy();
  });
});
