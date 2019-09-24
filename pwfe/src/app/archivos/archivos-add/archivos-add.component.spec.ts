import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivosAddComponent } from './archivos-add.component';

describe('ArchivosAddComponent', () => {
  let component: ArchivosAddComponent;
  let fixture: ComponentFixture<ArchivosAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivosAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivosAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
