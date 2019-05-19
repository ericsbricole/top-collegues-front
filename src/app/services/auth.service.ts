import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Participant } from '../models/Participant';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL_BACKEND = environment.backendUrl;
  public loggedInSubject = new Subject<boolean>();
  private _isLoggedIn = false;

  get isLoggedIn() {
    return this._isLoggedIn;
  }

  constructor(private _http: HttpClient, private _router: Router) { }

  public logIn(email: string, password: string) {
    const infosAuthent = { email, password };
    return this._http.post<Participant>(`${this.URL_BACKEND}/auth`, infosAuthent, { withCredentials: true })
      .pipe(
        tap(participant => {
          if (participant !== null) {
            this._isLoggedIn = true;
            this._router.navigate(['/vote']);
          }
        })
      );
  }

  public getCurrentParticipant() {
    return this._http.get<Participant>(`${this.URL_BACKEND}/me`, { withCredentials: true });
  }

  public logout(participant: Participant) {
    const infosAuthent = { "email": participant.email };
    return this._http.post<void>(`${this.URL_BACKEND}/auth`, infosAuthent, { withCredentials: true })
  }

}
