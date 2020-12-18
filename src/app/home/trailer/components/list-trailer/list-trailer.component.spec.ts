import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrailerComponent } from './list-trailer.component';

describe('ListTrailerComponent', () => {
  let component: ListTrailerComponent;
  let fixture: ComponentFixture<ListTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTrailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
