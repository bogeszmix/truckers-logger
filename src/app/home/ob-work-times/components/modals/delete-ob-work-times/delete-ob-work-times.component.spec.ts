import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteObWorkTimesComponent } from './delete-ob-work-times.component';

describe('DeleteObWorkTimesComponent', () => {
  let component: DeleteObWorkTimesComponent;
  let fixture: ComponentFixture<DeleteObWorkTimesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteObWorkTimesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteObWorkTimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
