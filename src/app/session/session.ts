import { Estimation } from '../estimation/estimation';

export interface Session {
  id?: string,
  title: string,
  estimations: Estimation[]

}
