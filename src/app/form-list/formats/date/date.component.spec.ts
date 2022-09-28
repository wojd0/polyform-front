import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateAnswerComponent } from './date.component';

describe('DateComponent', () => {
  let component: DateAnswerComponent;
  let fixture: ComponentFixture<DateAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
