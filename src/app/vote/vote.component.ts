import { Component, OnInit } from '@angular/core';
import { Voter } from '../models/Voter';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  private _voter: Voter;

  get voter() {
    return this._voter;
  }

  set voter(voter) {
    this._voter = voter;
  }

  public msgError: string;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.getCurrentVoter().subscribe(
      voter => {
        this._voter = voter;
      },
      (err: Error) => this.msgError = `Une erreur ${err.name} est arrivée pendant l'identification}`
    );
  }

}
