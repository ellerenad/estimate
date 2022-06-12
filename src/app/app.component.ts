import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject, first } from 'rxjs';
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
  session!: Observable<Session>;
  sessionId! : string;
  estimations: Estimation[] = new Array<Estimation>();

  constructor( private route: ActivatedRoute,  private store: AngularFirestore){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.sessionId = params['id'];
        if(this.sessionId ) {
          let session = { id: this.sessionId };
          // TODO Extract to another layer
          this.session = this.store.collection('sessions').doc<Session>(this.sessionId).valueChanges() as Observable<Session>;
          this.session.pipe(first()).subscribe((session) => {
            if(!session) {
              this.store.collection('sessions').doc<Session>(this.sessionId).set(session);
            }
          });
        }
    });
  }

  newEstimator(estimatorName: string): void{
    let estimationId = this.generateUniqueId();
    this.currentEstimation = new Estimation(estimationId, this.sessionId, estimatorName);
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
     // TODO Extract to another layer
     this.store.collection('sessions').doc<Session>(this.sessionId).set({title: task}, {merge : true});
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
