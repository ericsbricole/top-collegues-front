import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Participant } from '../models/Participant';
import { Vote } from '../models/Vote';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  private URL_BACKEND = environment.backendUrl;

  constructor(private _http: HttpClient) { }

  public findVotesTargetingParticipant(participant: Participant) {
    return this._http.get<Vote[]>(`${this.URL_BACKEND}/votes/${participant.matricule}`, { withCredentials: true })
  }

  public vote(target: Participant, voteType: string) {
    const body = {
      targetEmail: target.email,
      voteType
    }
    return this._http.post<void>(`${this.URL_BACKEND}/votes/add`, body, { withCredentials: true })
  }

}
