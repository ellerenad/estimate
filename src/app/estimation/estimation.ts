export class Estimation {
  id? : string;
  estimator: string;
  estimation?: string = "NA";
  complexity: number = 0;
  effort: number  = 0;
  uncertainty: number = 0;
  risk: number = 0;

  constructor(estimator: string){
    this.estimator = estimator;
  }

}
