import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";
import QuestionModel from "src/app/shared/models/question.model";
import { Results } from "src/app/shared/models/results.model";
import { AppState } from "src/app/store/app.reducer";

@Component({
    selector: "app-answers-list",
    templateUrl: "./answers-list.component.html",
    styleUrls: ["./answers-list.component.scss"],
    standalone: false
})
export class AnswersListComponent implements OnChanges, OnInit {
  show = false;

  @Input('list') list: {question: string, answers: string | number | string[]}[];
  @Input('heading') heading: string;
  results: Results;
  constructor(private state: Store<AppState>){}

  ngOnInit(){
    this.state.select('results').subscribe(state => {
      this.results = state.results;
    })
  }

  handleArray(val: any){
    if(Array.isArray(val)) return val.join(', ');
    return val;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(!changes['list'].isFirstChange()) this.show = true;      
  }
}
