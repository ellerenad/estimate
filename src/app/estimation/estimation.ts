export interface Estimation {
  id? : string;
  estimator: string;
  title: string;
  complexity: number;
  effort: number;
  uncertainty: number;
  risk: number;
}
