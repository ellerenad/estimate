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
          let session = { id: this.sessionId, showEstimationDetails: false };
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
      id: estimationId,
      sessionId: this.sessionId,
      estimator: estimatorName,
      estimation: "NA",
      complexity: 0,
      effort: 0,
      uncertainty: 0,
      risk: 0,
      isReady: false,
    } as Estimation;

    this.estimationsCollection.doc<Estimation>(this.currentEstimation.id).set(this.currentEstimation);
  }

  revealEstimations(): void {
    this.store.collection('sessions').doc<Session>(this.sessionId).set({showEstimationsDetails: true}, {merge : true});
  }

  newEstimationTask(task: string): void {
    // TODO Extract to another layer
    this.store.collection('sessions').doc<Session>(this.sessionId).set({title: task, showEstimationsDetails: false}, {merge : true});
    let resetEstimation = this.resetEstimation();
    this.estimationsCollection.snapshotChanges().pipe(first()).subscribe((docsEstimation: any) => {
      docsEstimation && docsEstimation.forEach( (doc : any) => {
        let id = doc.payload.doc.id;
        this.estimationsCollection.doc<Estimation>(id).update(resetEstimation);
      })
    });
    this.currentEstimation = Object.assign(this.currentEstimation, resetEstimation);


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

  resetEstimation() {
    return {
                 estimation: "NA",
                 complexity:  0,
                 effort:  0,
                 uncertainty:  0,
                 risk:  0,
                 isReady:  false,
       }
  }
}
