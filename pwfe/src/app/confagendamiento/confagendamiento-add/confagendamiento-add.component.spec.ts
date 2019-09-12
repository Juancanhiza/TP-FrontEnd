import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfagendamientoAddComponent } from './confagendamiento-add.component';

describe('ConfagendamientoAddComponent', () => {
  let component: ConfagendamientoAddComponent;
  let fixture: ComponentFixture<ConfagendamientoAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfagendamientoAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfagendamientoAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
