import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfagendamientoDetailComponent } from './confagendamiento-detail.component';

describe('ConfagendamientoDetailComponent', () => {
  let component: ConfagendamientoDetailComponent;
  let fixture: ComponentFixture<ConfagendamientoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfagendamientoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfagendamientoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
