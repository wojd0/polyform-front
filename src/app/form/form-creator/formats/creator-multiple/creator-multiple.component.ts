import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MultipleQuestion } from 'src/app/shared/question.model';

@Component({
  selector: 'creator-multiple',
  templateUrl: './creator-multiple.component.html'
})
export class MultipleCreatorComponent implements OnInit {
  options = ['1', '2', '3'];
  @Output('changed') changed = new EventEmitter<MultipleQuestion>();

  constructor() { }

  ngOnInit(): void {
  }

  add(value: string){
    this.options.push(value);
  }

  remove(value: string){
    this.options.splice(this.options.indexOf(value), 1);
  }

}
