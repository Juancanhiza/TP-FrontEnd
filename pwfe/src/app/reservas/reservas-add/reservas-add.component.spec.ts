import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasAddComponent } from './reservas-add.component';

describe('ReservasAddComponent', () => {
  let component: ReservasAddComponent;
  let fixture: ComponentFixture<ReservasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservasAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
