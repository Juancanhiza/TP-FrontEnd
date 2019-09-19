import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientesAddComponent } from './pacientes-add.component';

describe('PacientesAddComponent', () => {
  let component: PacientesAddComponent;
  let fixture: ComponentFixture<PacientesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
