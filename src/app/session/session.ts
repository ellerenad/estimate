import { Estimation } from '../estimation/estimation';

export interface Session {
  id?: string | null,
  title: string,
  estimations: Estimation[]

}
