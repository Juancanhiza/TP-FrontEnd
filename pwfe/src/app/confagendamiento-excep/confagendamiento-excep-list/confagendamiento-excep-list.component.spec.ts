import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfagendamientoExcepListComponent } from './confagendamiento-excep-list.component';

describe('ConfagendamientoExcepListComponent', () => {
  let component: ConfagendamientoExcepListComponent;
  let fixture: ComponentFixture<ConfagendamientoExcepListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfagendamientoExcepListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfagendamientoExcepListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
