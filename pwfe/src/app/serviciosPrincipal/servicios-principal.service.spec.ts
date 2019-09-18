import { TestBed } from '@angular/core/testing';

import { ServiciosPrincipalService } from './servicios-principal.service';

describe('ServiciosPrincipalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiciosPrincipalService = TestBed.get(ServiciosPrincipalService);
    expect(service).toBeTruthy();
  });
});
