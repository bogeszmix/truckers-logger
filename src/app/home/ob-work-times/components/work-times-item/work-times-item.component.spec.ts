import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkTimesItemComponent } from './work-times-item.component';

describe('WorkTimesItemComponent', () => {
  let component: WorkTimesItemComponent;
  let fixture: ComponentFixture<WorkTimesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkTimesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkTimesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
