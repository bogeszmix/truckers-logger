import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTrailerComponent } from './create-edit-trailer.component';

describe('CreateEditTrailerComponent', () => {
  let component: CreateEditTrailerComponent;
  let fixture: ComponentFixture<CreateEditTrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditTrailerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditTrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
