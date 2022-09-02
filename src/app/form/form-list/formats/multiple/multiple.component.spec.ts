import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleAnswerComponent } from './multiple.component';

describe('MultipleComponent', () => {
  let component: MultipleAnswerComponent;
  let fixture: ComponentFixture<MultipleAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipleAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
