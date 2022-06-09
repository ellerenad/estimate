import { Component } from '@angular/core';
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
  session: Session = {
    title: 'First Task',
    estimations: [{
                                                   estimator: 'Enrique',
                                                   complexity: 3,
                                                   effort: 1,
                                                   uncertainty: 2,
                                                   risk: 3,
                                                 },{
                                                   estimator: 'Luz',
                                                   complexity: 3,
                                                   effort: 1,
                                                   uncertainty: 2,
                                                   risk: 3,
                                                 }]
  }

  newEstimation(estimatorName: string){
    this.currentEstimation = new Estimation(estimatorName);
    this.session.estimations.push(this.currentEstimation);
  }

}
