import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompleteProfileComponent } from '../pages/complete-profile/complete-profile.component';
import { HomeComponent } from '../pages/home/home.component';
import { ProfileComponent } from '../pages/profile/profile.component';

export const LayoutRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'completeRegister', component: CompleteProfileComponent},
  { path: 'profile', component: ProfileComponent}
];