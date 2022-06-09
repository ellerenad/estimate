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
                                                   isVisible: false
                                                 },{
                                                   estimator: 'Luz',
                                                   complexity: 3,
                                                   effort: 1,
                                                   uncertainty: 2,
                                                   risk: 3,
                                                   isVisible: false
                                                 }]
  }

  newEstimation(estimatorName: string): void{
    this.currentEstimation = new Estimation(estimatorName);
    this.session.estimations.push(this.currentEstimation);
  }

  revealEstimations(): void {
    if(this.session && this.session.estimations){
      this.session.estimations.forEach(estimation => estimation.isVisible = true);
    }
  }
}
