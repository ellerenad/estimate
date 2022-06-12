import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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
  currentEstimation!: Estimation;
  isAdmin: boolean = true;
  session!: Observable<Session>;
  sessionId! : string;
  estimationsCollection!: AngularFirestoreCollection<Estimation>;
  estimations!: Observable<Estimation[]>;


  constructor( private route: ActivatedRoute,  private store: AngularFirestore){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
        this.sessionId = params['id'];
        if(this.sessionId ) {
          let session = { id: this.sessionId };
          // TODO Extract to another layer
          this.session = this.store.collection('sessions').doc<Session>(this.sessionId).valueChanges() as Observable<Session>;
          this.session.pipe(first()).subscribe((sessionDoc) => {
            if(!sessionDoc) {
              this.store.collection('sessions').doc<Session>(this.sessionId).set(session);
            }
            // TODO Standarize the handling with the session
            this.estimationsCollection = this.store.collection<Estimation>('estimations', ref => ref.where('sessionId','==', this.sessionId));
            this.estimations = this.estimationsCollection.valueChanges();
          });
        }
    });
  }

  newEstimation(estimatorName: string): void{
    let estimationId = this.generateUniqueId();
    // TODO find a better way to instantiate and in general handle this
    // the problem is https://stackoverflow.com/questions/46578701/firestore-add-custom-object-to-db
    this.currentEstimation =  {
      id:estimationId,
      sessionId: this.sessionId,
      estimator: estimatorName,
       estimation: "NA",
        complexity:  0,
        effort:  0,
        uncertainty:  0,
        risk:  0,
        isVisible:  true, // TODO change to e.g. isRevealed or isSecret?
        isReady:  false,
    } as Estimation;

    this.estimationsCollection.doc<Estimation>(this.currentEstimation.id).set(this.currentEstimation);
  }

  revealEstimations(): void {
    if(this.estimations){
     // this.estimations.forEach(estimation => estimation.isVisible = true);
    }
  }

  newEstimationTask(task: string): void {
    if(this.estimations){
          /*this.estimations.forEach(estimation => {
            this.reset(estimation);
            estimation.isVisible = false;
          });*/
     // TODO Extract to another layer
     this.store.collection('sessions').doc<Session>(this.sessionId).set({title: task}, {merge : true});
    }
  }

  deleteEstimationEventHandler(estimationToDelete: Estimation):void {
    //this.estimations = this.estimations.filter(e => e != estimationToDelete );
  }

  generateUniqueId(): string {
    let uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2);
    return uniqueId;
  }

  estimationReadyEventHandler(estimation: Estimation): void {
    this.estimationsCollection.doc<Estimation>(estimation.id).set(estimation);
  }

  reset(estimation: Estimation): void {
    estimation.estimation = "NA";
    estimation.complexity = 0;
    estimation.effort  = 0;
    estimation.uncertainty = 0;
    estimation.risk = 0;
    estimation.isReady = false;
  }
}
