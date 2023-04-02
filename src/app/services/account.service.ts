import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { ApiPaths, environment } from 'src/environments/environment.prod';
import { Profile, Profilepic, User } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url = environment.baseUrl;
  profile = environment.apipaths.Getprofile;
  profilepic = environment.apipaths.Getprofilepic;
  user = environment.apipaths.Getuser;
  picsbyprofile = environment.apipaths.Getprofilepicprof;
  errors:any = [];
  profilePicArr: Profilepic[] = [];

  constructor(private http: HttpClient, private login: LoginService) { }

  loadAcc(id: any) {

    return this.http.get<Profile>(this.url + this.profile + id)
      .pipe(
        map((response) => {
          let user: Profile;
          user = response;
          return user;
        })
      )
  }

  updateAcc(id:any, username?: string, email?: string, first_name?: string, last_name?: string){
    return this.http.patch(this.url + this.user + id +'/', {username, email,first_name, last_name })
    .pipe(map(
      (response: any)=>{
        let user: User;
        user =response;
        return user;
      }
    ))
  }

  choosePic(id: any){
    return this.http.get<Profilepic[]>(this.url + this.picsbyprofile + id +'/');
 
  }
  selectedPic(id: any){
    return this.http.patch(this.url+this.profilepic +id+'/', {selected: true});
  }
  deletePic(id:any){
    return this.http.delete(this.url+this.profilepic +id+'/')
    .pipe(map((response:any)=>{
        this.profilePicArr = response;
        return this.profilePicArr;
      }))
  }
  updateProfilePic(profilepic:FormData){
    return this.http.post(this.url + this.profilepic, profilepic )
    .pipe(map(
      (response: any)=>{
        let profile: Profilepic;
        profile =response;
        return profile;
      }
    ), catchError((error) => {
        this.errors.push(error);
        return this.errors;
      }))
  }
  fakeCall() {
    return this.http.get(this.url + this.profile);
  }
}