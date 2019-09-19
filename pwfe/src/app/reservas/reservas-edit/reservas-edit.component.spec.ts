import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasEditComponent } from './reservas-edit.component';

describe('ReservasEditComponent', () => {
  let component: ReservasEditComponent;
  let fixture: ComponentFixture<ReservasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
