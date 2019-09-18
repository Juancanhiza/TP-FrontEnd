import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichasAddComponent } from './fichas-add.component';

describe('FichasAddComponent', () => {
  let component: FichasAddComponent;
  let fixture: ComponentFixture<FichasAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichasAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichasAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
