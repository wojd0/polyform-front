import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BeerService } from '../beer.service';
import { Results } from '../shared/models/results.model';
import { AppState } from '../store/app.reducer';
import { loadResults } from './store/results.actions';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private store: Store<AppState>, private beerService: BeerService) {}

  accessCode = '';
  formName = 'exampleForm';
  results: Results;
  activeTab = 1;

  modalList: {name: string, content: string[]}[];
  listHeading: 'byq' | 'bys';

  ngOnInit(): void {
    this.accessCode = this.router.url.substring(this.router.url.lastIndexOf("/") + 1);
    this.store.dispatch(loadResults({accessCode: this.accessCode}));
    this.store.select('results').subscribe(state=>{
      if(state.error){
        this.router.navigate(['/']);
        this.beerService.showModal.next({
          type: 'wrongAccess',
          content: {
            msg: 'Provided results access code is invalid!'
          }
        });
      }
      
      this.results = state.results;
      console.log(this.results);
      
    });
    
  }

  ngAfterViewInit(): void {
      
  }

  answersByquestion(index: number){
    return this.results.submissions.map(submission => {
      if(submission.answers[index] !== '' && !!submission.answers[index]){
        return submission.answers[index]
      }
      return null;
    })
  }

  //'BY SUBMISSIONS'
  showAnswersFromSubmission(id: number){
    this.modalList = this.results.submissions[id].answers.map((answer, questionIndex) => ({
      content: [answer],
      name: this.results.questions[questionIndex]
    }));
    this.listHeading = 'bys';
  }

  //'BY QUESTIONS'
  showAnswersToQuestion(id: number){
    this.modalList = [{
      name: this.results.questions[id],
      content: this.results.submissions.map(submission => submission.answers[id])
    }]
    this.listHeading = 'byq';
  }

}
