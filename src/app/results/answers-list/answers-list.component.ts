import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.reducer";
import { Results } from "src/app/shared/models/results.model";

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

  onClose(){
    this.show = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.list && this.list.length != 0) {
      this.show = true;
    }      
  }
}
