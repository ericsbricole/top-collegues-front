import { Component, OnInit, Input } from '@angular/core';
import { Voter } from '../models/Voter';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  public msgError = '';
  @Input()private _email: string;
  private _password: string;

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get password() {
    return this._password;
  }

  set password(password) {
    this._password = password;
  }

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

  authenticate() {
    this._authService.logIn(this._email, this._password).subscribe(
      voter => { console.log("voter = " + voter); },
      (err: Error) => this.msgError = `Une erreur ${err.name} est arrivée pendant la connexion:\n${err.message}`,
      () => console.log('fin de la tentative de connection')
    )
  }

}
