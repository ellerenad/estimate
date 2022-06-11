import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Estimation } from './estimation/estimation';
import { Session } from './session/session';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'estimation-app';
  currentEstimation?: Estimation;
  isAdmin: boolean = true;
  session: Session = {
                       title: '',
                       estimations: []
                     };

  constructor( private route: ActivatedRoute,  private store: AngularFirestore){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.session.id = params['id'];
    });
  }

  newEstimator(estimatorName: string): void{
    this.currentEstimation = new Estimation(estimatorName);
    this.session.estimations.push(this.currentEstimation);
  }

  revealEstimations(): void {
    if(this.session && this.session.estimations){
      this.session.estimations.forEach(estimation => estimation.isVisible = true);
    }
  }

  newEstimationTask(task: string): void {
    if(this.session && this.session.estimations){
          this.session.estimations.forEach(estimation => {
            estimation.reset();
            estimation.isVisible = false;
          });
      this.session.title = task;
    }
  }

  deleteEstimation(estimationToDelete: Estimation):void {
    this.session.estimations = this.session.estimations.filter(e => e != estimationToDelete );
  }
}
