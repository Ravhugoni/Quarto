import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteProfileComponent } from '../pages/complete-profile/complete-profile.component';
import { FeaturesComponent } from '../pages/features/features.component';
import { HomeComponent } from '../pages/home/home.component';
import { AddJobComponent } from '../pages/jobs/add-job/add-job.component';
import { JobsComponent } from '../pages/jobs/jobs.component';
import { ProfileComponent } from '../pages/profile/profile.component';

export const LayoutRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'completeRegister', component: CompleteProfileComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'features', component: FeaturesComponent},
  { path: 'jobs/:cat', component: JobsComponent},
  { path: 'addJob', component: AddJobComponent},
];