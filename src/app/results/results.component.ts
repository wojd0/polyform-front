import { AfterViewInit, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { BeerService } from "../beer.service";
import QuestionModel from "../shared/models/question.model";
import { Results } from "../shared/models/results.model";
import { AppState } from "../store/app.reducer";
import { loadResults } from "./store/results.actions";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements OnInit, AfterViewInit {
  /*
  TODO: Add submision date graph (stock like)
  */
  constructor(private router: Router, private store: Store<AppState>, private beerService: BeerService) {}

  accessCode = "";
  formName = "exampleForm";
  results: Results;
  activeTab = 0;

  modalList: { question: string; answers: any }[];
  listHeading: string;

  graphResults: any;

  ngOnInit(): void {
    this.accessCode = this.router.url.substring(this.router.url.lastIndexOf("/") + 1);
    this.store.dispatch(loadResults({ accessCode: this.accessCode }));
    this.store.select("results").subscribe((state) => {
      if (state.error) {
        this.router.navigate(["/"]);
        this.beerService.modal.next({
          type: "general",
          content: {
            msg: "Provided results access code is invalid!",
            redirect: true,
          },
        });
      }

      this.results = state.results;
    });
  }

  ngAfterViewInit(): void {}

  answersByquestion(index: number) {
    return this.results.submissions.map((submission) => {
      if (submission.answers[index] !== "" && !!submission.answers[index]) {
        return submission.answers[index];
      }
      return null;
    });
  }

  //'BY SUBMISSIONS'
  showAnswersFromSubmission(id: number) {
    this.modalList = this.results.submissions[id].answers.map((answer, questionIndex) => ({
      answers: answer,
      question: this.results.questions[questionIndex].query,
    }));
    this.listHeading = `Answers from submission number ${id + 1}`;
  }

  //'BY QUESTIONS'
  showAnswersToQuestion(id: number) {
    this.modalList = [
      {
        question: this.results.questions[id].query,
        answers: this.results.submissions.map((submission) => submission.answers[id]).flat(),
      },
    ];
    this.listHeading = "byq";
  }

  showGraph(id: number) {
    const answers = {};
    this.results.submissions
      .map((submission) => submission.answers[id])
      .flat()
      .forEach((ans, index) => {
        answers[index] = typeof answers[index] === "undefined" ? 1 : answers[index] + 1;
      });

    this.graphResults = Object.entries(answers).map(([key, val]) => {
      return { name: key, value: val };
    });
  }
}
