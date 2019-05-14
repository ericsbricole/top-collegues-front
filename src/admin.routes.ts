import { Routes } from '@angular/router';
import { AuthComponent } from './app/auth/auth.component';
import { ConnectionGuard } from './app/guards/connection.guard';
import { VoteComponent } from './app/vote/vote.component';
import { FourZeroFourComponent } from './app/four-zero-four/four-zero-four.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: '', canActivate: [ConnectionGuard], children: [
      { path: 'vote', component: VoteComponent },
      { path: 'not-found', component: FourZeroFourComponent },
      { path: '**', redirectTo: 'not-found' }
    ]
  }
];
