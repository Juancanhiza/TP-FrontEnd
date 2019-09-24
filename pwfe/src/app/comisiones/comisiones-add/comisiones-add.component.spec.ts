import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComisionesAddComponent } from './comisiones-add.component';

describe('ComisionesAddComponent', () => {
  let component: ComisionesAddComponent;
  let fixture: ComponentFixture<ComisionesAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComisionesAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComisionesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
