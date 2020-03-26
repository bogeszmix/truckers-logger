import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewObWorkTimesComponent } from './new-ob-work-times.component';

describe('NewObWorkTimesComponent', () => {
  let component: NewObWorkTimesComponent;
  let fixture: ComponentFixture<NewObWorkTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewObWorkTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewObWorkTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
