export interface Estimation {
  estimation: string;
  complexity: number;
  effort: number;
  uncertainty: number;
  risk: number;
  isReady: boolean;

  id:string;
  sessionId: string;
  estimator: string;


}
