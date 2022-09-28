import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAnswerComponent } from './file.component';

describe('FileComponent', () => {
  let component: FileAnswerComponent;
  let fixture: ComponentFixture<FileAnswerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileAnswerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
