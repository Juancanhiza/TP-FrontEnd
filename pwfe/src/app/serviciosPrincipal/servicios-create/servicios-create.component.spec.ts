import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosCreateComponent } from './servicios-create.component';

describe('ServiciosCreateComponent', () => {
  let component: ServiciosCreateComponent;
  let fixture: ComponentFixture<ServiciosCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
