import { AfterViewInit, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NumberQuestionOptions } from 'src/app/shared/models/question.model';

//TODO: handle precision (float answers)
@Component({
  selector: 'creator-number',
  templateUrl: './creator-number.component.html'
})
export class NumberCreatorComponent implements AfterViewInit {
  @Output('changed') value = new EventEmitter<NumberQuestionOptions>();
  @ViewChild('form') form !: NgForm;

  min = 0;
  max = 100;
  prefix = '';
  suffix = '';
  precision = 2;

  constructor() { }

  ngAfterViewInit(): void {
    this.form.valueChanges?.subscribe(val=>{
      this.value.emit({
        max: this.max,
        min: this.min,
        precision: this.precision,
        prefix: this.prefix,
        suffix: this.suffix
      });
    })
  }

  
}
