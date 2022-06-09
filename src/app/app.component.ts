import { Component } from '@angular/core';
import { Estimation } from './estimation/estimation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'estimation-app';
  estimations : Estimation[] = [{
                                  estimator: 'Enrique',
                                  title: 'First Task',
                                  complexity: 3,
                                  effort: 1,
                                  uncertainty: 2,
                                  risk: 3,
                                }]
}
