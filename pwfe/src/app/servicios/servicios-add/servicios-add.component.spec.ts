import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosAddComponent } from './servicios-add.component';

describe('ServiciosAddComponent', () => {
  let component: ServiciosAddComponent;
  let fixture: ComponentFixture<ServiciosAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiciosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiciosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
