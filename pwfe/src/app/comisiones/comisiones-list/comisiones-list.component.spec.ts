import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionesListComponent } from './comisiones-list.component';

describe('ComisionesListComponent', () => {
  let component: ComisionesListComponent;
  let fixture: ComponentFixture<ComisionesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
