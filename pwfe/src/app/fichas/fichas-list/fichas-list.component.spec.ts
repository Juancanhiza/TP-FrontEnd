import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FichasListComponent } from './fichas-list.component';

describe('FichasListComponent', () => {
  let component: FichasListComponent;
  let fixture: ComponentFixture<FichasListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FichasListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FichasListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
