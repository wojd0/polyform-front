import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberAnswerComponent } from './number.component';

describe('NumberComponent', () => {
  let component: NumberAnswerComponent;
  let fixture: ComponentFixture<NumberAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
