import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";
import QuestionModel from "src/app/shared/models/question.model";
import { Results } from "src/app/shared/models/results.model";
import { AppState } from "src/app/app.reducer";

@Component({
  selector: "app-answers-list",
  templateUrl: "./answers-list.component.html",
  styleUrls: ["./answers-list.component.scss"],
})
export class AnswersListComponent implements OnChanges, OnInit {
  show = false;

  @Input('list') list: {question: string, answers: string}[];
  @Input('heading') heading: string;
  results: Results;
  constructor(private state: Store<AppState>){}

  ngOnInit(){
    this.state.select('results').subscribe(state => {
      this.results = state.results;
    })
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(!changes['list'].isFirstChange()) {
      console.log(this.list);
      
      this.show = true;
    }      
  }
}
