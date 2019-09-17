import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfagendamientoExcepAddComponent } from './confagendamiento-excep-add.component';

describe('ConfagendamientoExcepAddComponent', () => {
  let component: ConfagendamientoExcepAddComponent;
  let fixture: ComponentFixture<ConfagendamientoExcepAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfagendamientoExcepAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfagendamientoExcepAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
