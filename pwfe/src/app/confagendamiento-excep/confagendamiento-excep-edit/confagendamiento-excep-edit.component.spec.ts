import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfagendamientoExcepEditComponent } from './confagendamiento-excep-edit.component';

describe('ConfagendamientoExcepEditComponent', () => {
  let component: ConfagendamientoExcepEditComponent;
  let fixture: ComponentFixture<ConfagendamientoExcepEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfagendamientoExcepEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfagendamientoExcepEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
