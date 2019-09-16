import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfagendamientoEditComponent } from './confagendamiento-edit.component';

describe('ConfagendamientoEditComponent', () => {
  let component: ConfagendamientoEditComponent;
  let fixture: ComponentFixture<ConfagendamientoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfagendamientoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfagendamientoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
