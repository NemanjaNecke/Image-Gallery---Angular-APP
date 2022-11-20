import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './components/nav/nav.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FileFormComponent } from './components/file-form/file-form.component';
import { ChooseComponent } from './components/choose/choose.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { UpdateDetailsComponent } from './components/update-details/update-details.component';
import { LoginFormComponent } from './components/login-form/login-form.component';

import { PopupComponent } from './components/popup/popup.component';
import { RefreshtokenInterceptor } from './services/refreshtoken.interceptor';
import { RegistrationComponent } from './components/registration/registration.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserGalleryComponent } from './components/user-gallery/user-gallery.component';
import { PicChooseComponent } from './components/pic-choose/pic-choose.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    GalleryComponent,
    AboutComponent,
    HomeComponent,
    FileFormComponent,
    ChooseComponent,
    ImageDetailsComponent,
    UpdateDetailsComponent,
    LoginFormComponent,
    PopupComponent,
    RegistrationComponent,
    ProfileComponent,
    UserGalleryComponent,
    PicChooseComponent,
    ChangepasswordComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: RefreshtokenInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
