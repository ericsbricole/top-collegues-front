import { Component, OnInit } from '@angular/core';
import { Participant } from '../models/Participant';
import { AuthService } from '../services/auth.service';
import { VoteService } from '../services/vote.service';
import { Vote } from '../models/Vote';
import { ParticipantService } from '../services/participant.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {

  private _participant: Participant;
  private _participants: Participant[];
  private _mapParticipantToVotesTargetingIt: Map<Participant, Vote[]>;
  public voteMsgError: string;

  get participant() {
    return this._participant;
  }

  set participant(participant) {
    this._participant = participant;
  }

  get participants() {
    return this._participants;
  }

  set participants(participants) {
    this._participants = participants;
  }

  get mapParticipantToVotesTargetingIt() {
    return this._mapParticipantToVotesTargetingIt;
  }

  set mapParticipantToVotesTargetingIt(mapParticipantToVotesTargetingIt) {
    this._mapParticipantToVotesTargetingIt = mapParticipantToVotesTargetingIt;
  }

  public msgError: string;

  constructor(private _authService: AuthService, private _voteService: VoteService, private _participantService: ParticipantService) {
    this._mapParticipantToVotesTargetingIt = new Map();
  }

  ngOnInit() {
    this._authService.getCurrentParticipant().subscribe(
      participant => {
        this._participant = participant;
      },
      (err: Error) => this.msgError = `Une erreur ${err.name} est arrivée pendant l'identification}`,
      () => this.sortParticipants()
    );

    this._participantService.getParticipants().subscribe(
      participants => {
        this._participants = participants;
      },
      (err: Error) => this.msgError = `Une erreur ${err.name} est arrivée pendant l'identification}`,
      () => this.findVotesByParticipant()
    );
  }

  findVotesByParticipant() {
    this._participants.forEach(participant => {
      this._voteService.findVotesTargetingParticipant(participant).subscribe(
        votes => this._mapParticipantToVotesTargetingIt.set(participant, votes)
      )
    });
  }

  public findPositiveVotesTargetingParticipant(participant: Participant) {
    return this._mapParticipantToVotesTargetingIt.get(participant).filter(vote => vote.voteType === "LIKE");
  }

  public findNegativeVotesTargetingParticipant(participant: Participant) {
    return this._mapParticipantToVotesTargetingIt.get(participant).filter(vote => vote.voteType === "DISLIKE");
  }

  public vote(target: Participant, voteType: string) {
    this._voteService.vote(target, voteType).subscribe(
      () => { },
      (err: Error) => this.voteMsgError = `Une erreur ${err.name} est survenue lors du vote pour ${target.nom} ${target.prenoms}: ${err.stack}`,
      () => {
        this._voteService.findVotesTargetingParticipant(target).subscribe(
          votes => this._mapParticipantToVotesTargetingIt.set(target, votes)
        );
        this._participantService.findParticipant(target.matricule).subscribe(
          updatedTarget => this._participants.find(target => target.matricule === updatedTarget.matricule).score = updatedTarget.score,
          err => { },
          () => this.sortParticipants());
      }
    )
  }

  public sortParticipants() {
    this._participants.sort((p1, p2) => p1.score - p2.score);
    this._participants.reverse();
  }

  public logout() {
    this._authService.logout(this._participant).subscribe(
      () => {}
    );
  }

}
