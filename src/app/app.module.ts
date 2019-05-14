import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ADMIN_ROUTES } from '../admin.routes';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { VoteComponent } from './vote/vote.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FourZeroFourComponent } from './four-zero-four/four-zero-four.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    VoteComponent,
    FourZeroFourComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ADMIN_ROUTES),
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
