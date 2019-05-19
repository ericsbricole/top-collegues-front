import { Vote } from './Vote';

export class Participant {

  public matricule: string;
  public email: string;
  public nom: string;
  public prenoms: string;
  public photoUrl: string;
  public score: number;
  public votes: Vote[];


}
