import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickFilteredStatisticsComponent } from './quick-filtered-statistics.component';

describe('QuickFilteredStatisticsComponent', () => {
  let component: QuickFilteredStatisticsComponent;
  let fixture: ComponentFixture<QuickFilteredStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickFilteredStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickFilteredStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
