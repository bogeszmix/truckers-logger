import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditObWorkTimesComponent } from './edit-ob-work-times.component';

describe('EditObWorkTimesComponent', () => {
  let component: EditObWorkTimesComponent;
  let fixture: ComponentFixture<EditObWorkTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditObWorkTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditObWorkTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
