import { LoginGuard } from './services/login.guard';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { HomeComponent } from './components/home/home.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { IsLoggedGuard } from './services/is-logged.guard';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationGuardGuard } from './services/registration-guard.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

const routes: Routes = [
  { path: '', 
  redirectTo: 'login', 
  pathMatch: 'full' },
  
  {
    path:'login',
    component:LoginFormComponent,
    canActivate:[IsLoggedGuard]
  }
  ,
  {
    path: 'registration',
    component: RegistrationComponent,
    //canActivate: [RegistrationGuardGuard]
  }
  ,
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [LoginGuard]
  },
{
  path: 'changePassword',
  component: ChangepasswordComponent,
  canActivate: [LoginGuard]
}
  ,
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[LoginGuard],
    
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    canActivate:[LoginGuard],
    canLoad: [LoginGuard]
  },
 // {
    //path: 'gallery/:id',
    //component: ImageDetailsComponent,
 // },
  {
    path: 'about',
    component: AboutComponent,
    canActivate:[LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' }), ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
