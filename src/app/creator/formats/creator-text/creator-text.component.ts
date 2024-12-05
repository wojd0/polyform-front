import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { TextQuestion } from 'src/app/shared/models/question.model';

@Component({
    selector: 'creator-text',
    templateUrl: './creator-text.component.html',
    standalone: false
})
export class TextCreatorComponent implements AfterViewInit {
  @Output('changed') value = new EventEmitter<TextQuestion>();
  @ViewChild('form') form !: NgForm;

  minWords = 0;
  maxWords = 40;
  question = '';
  constructor() { }

  ngAfterViewInit(): void {
    this.form.valueChanges?.subscribe(val =>{
      
      this.value.emit(val);
    })
  }


}
