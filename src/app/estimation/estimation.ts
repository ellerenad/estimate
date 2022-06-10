export class Estimation {
  id? : string;
  estimator: string;
  estimation?: string = "NA";
  complexity: number = 0;
  effort: number  = 0;
  uncertainty: number = 0;
  risk: number = 0;
  isVisible: boolean = true; // TODO change to e.g. isRevealed or isSecret?
  isReady: boolean = false;

  constructor(estimator: string){
    this.estimator = estimator;
  }

  reset(): void {
    this.estimation = "NA";
    this.complexity = 0;
    this.effort  = 0;
    this.uncertainty = 0;
    this.risk = 0;
    this.isReady = false;
  }

}
