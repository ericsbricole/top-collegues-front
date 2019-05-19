import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Participant } from '../models/Participant';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  private URL_BACKEND = environment.backendUrl;

  constructor(private _http: HttpClient) { }

  public findParticipant(matricule: string) {
    return this._http.get<Participant>(`${this.URL_BACKEND}/participants/${matricule}`, { withCredentials: true });
  }

  public getParticipants() {
    return this._http.get<Participant[]>(`${this.URL_BACKEND}/participants`, { withCredentials: true });
  }

}
