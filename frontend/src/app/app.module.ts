import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { AuthguradService } from './service/authgurad.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { JobsComponent } from './pages/jobs/jobs.component';
import { FeaturesComponent } from './pages/features/features.component';
import { AddJobComponent } from './pages/jobs/add-job/add-job.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { BidJobListComponent } from './pages/jobs/bid-job-list/bid-job-list.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FeaturesComponent,
    JobsComponent,
    AddJobComponent,
    ProfileComponent,
    ViewUserComponent,
    BidJobListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgToastModule,
    NgxSpinnerModule,
    DataTablesModule,
  ],
  providers: [
    AuthguradService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
