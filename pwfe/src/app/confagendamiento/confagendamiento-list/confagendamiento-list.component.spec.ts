import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfagendamientoListComponent } from './confagendamiento-list.component';

describe('ConfagendamientoListComponent', () => {
  let component: ConfagendamientoListComponent;
  let fixture: ComponentFixture<ConfagendamientoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfagendamientoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfagendamientoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
