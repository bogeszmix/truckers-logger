import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObWorkTimesComponent } from './ob-work-times.component';

describe('ObWorkTimesComponent', () => {
  let component: ObWorkTimesComponent;
  let fixture: ComponentFixture<ObWorkTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObWorkTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObWorkTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
