import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichasEditComponent } from './fichas-edit.component';

describe('FichasEditComponent', () => {
  let component: FichasEditComponent;
  let fixture: ComponentFixture<FichasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
