import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerListItemComponent } from './trailer-list-item.component';

describe('TrailerListItemComponent', () => {
  let component: TrailerListItemComponent;
  let fixture: ComponentFixture<TrailerListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailerListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
