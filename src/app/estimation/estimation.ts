export interface Estimation {
  estimation: string;
  complexity: number;
  effort: number;
  uncertainty: number;
  risk: number;
  isVisible: boolean; // TODO change to e.g. isRevealed or isSecret?
  isReady: boolean;

  id:string;
  sessionId: string;
  estimator: string;


}
