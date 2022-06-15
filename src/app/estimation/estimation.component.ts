import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { Estimation } from './estimation'

@Component({
  selector: 'app-estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.css']
})
export class EstimationComponent implements OnInit {

  @Input() estimation: Estimation | null = null;
  @Input() showDetails: boolean | undefined = false;
  @Input() disabled: boolean = false;
  @Input() layout: string = 'vertical';
  @Output() deleteEstimationEvent = new EventEmitter<Estimation>();
  @Output() estimationReadyEvent = new EventEmitter<Estimation>();

  LIMIT_EXTRA_SMALL: number = 4;
  LIMIT_SMALL: number = 8;
  LIMIT_MEDIUM: number = 12;
  LIMIT_LARGE: number = 16;
  LIMIT_EXTRA_LARGE: number = 20;
  NO_ESTIMATION: number = 0;

  constructor() { }

  ngOnInit(): void {  }

  getDimensionsSum(): number{
    if(this.estimation){
      return this.estimation.complexity +
             this.estimation.effort +
             this.estimation.uncertainty +
             this.estimation.risk;
    }
    return this.NO_ESTIMATION;
  }

  areAllDimensionsSet(): boolean {
    return this.estimation != null &&
           this.estimation != undefined &&
           this.estimation.complexity != this.NO_ESTIMATION &&
           this.estimation.effort != this.NO_ESTIMATION &&
           this.estimation.uncertainty != this.NO_ESTIMATION &&
           this.estimation.risk != this.NO_ESTIMATION;
  }

  getRecommendedEstimation(): string {
     if(!this.areAllDimensionsSet()){
        return 'NA';
     }

     let dimensionsSum = this.getDimensionsSum();
     if(dimensionsSum === this.NO_ESTIMATION){
        return 'NA';
     }
     if(dimensionsSum <= this.LIMIT_EXTRA_SMALL){
        return 'XS';
     }
     if(dimensionsSum <= this.LIMIT_SMALL){
          return 'S';
     }
     if(dimensionsSum <= this.LIMIT_MEDIUM){
          return 'M';
     }
     if(dimensionsSum <= this.LIMIT_LARGE){
          return 'L';
     }

     return 'XL';
  }

  dimensionChanged(): void{
     if(this.estimation){
        this.estimation.estimation = this.getRecommendedEstimation();
     }
  }

  formatEstimationLabel(value: number) {
     switch(value){
       case 1: return 'XS';
       case 2: return 'S';
       case 3: return 'M';
       case 4: return 'L';
       case 5: return 'XL';
       case 6: return 'XXL';
       default: return 'NA'
     }
  }

  estimationReady(): void {
    if(this.estimation){
      this.estimation.isReady = true;
      this.estimationReadyEvent.emit(this.estimation);
    }
  }
}
