import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
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
  session = {
                                   title: '',
                                   id: this.generateUniqueId()
                                   }
  estimations: Estimation[] = new Array<Estimation>();

  constructor( private route: ActivatedRoute,  private store: AngularFirestore){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.session.id = params['id'];
        //this.store.collection('session').add(this.session);
    });
  }

  newEstimator(estimatorName: string): void{
    let estimationId = this.generateUniqueId();
    this.currentEstimation = new Estimation(estimationId, this.session.id, estimatorName);
    this.estimations.push(this.currentEstimation);
  }

  revealEstimations(): void {
    if(this.estimations){
      this.estimations.forEach(estimation => estimation.isVisible = true);
    }
  }

  newEstimationTask(task: string): void {
    if(this.estimations){
          this.estimations.forEach(estimation => {
            estimation.reset();
            estimation.isVisible = false;
          });
      this.session.title = task;
    }
  }

  deleteEstimation(estimationToDelete: Estimation):void {
    this.estimations = this.estimations.filter(e => e != estimationToDelete );
  }

  generateUniqueId(): string {
    let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    return uniqueId;
  }
}
