import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, shareReplay } from 'rxjs';
import { environment, RegistrationPaths } from 'src/environments/environment.prod';
import { UserResponse } from '../models/user.model';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private baseUrl = environment.baseUrl;
  private registrationUrl = environment.registrationpaths.registration;
  public errors: any = []; 
  username: string = ''
  registered: boolean = false;

  constructor(private http: HttpClient, private login: LoginService,
    private handler: HttpBackend,) {
      this.http = new HttpClient(handler);
     }

  registrate(username: string, password1: string, password2: string, email: string){
    return this.http.post<UserResponse>(this.baseUrl + this.registrationUrl, {username, password1, password2, email})
    .pipe(shareReplay()).pipe(
      map((tokens: UserResponse) => {
        //this.login.updateData(tokens['access_token']);
        //this.login.updateRefreshToken(tokens['refresh_token']);
        //console.log(tokens)
        //this.login.setUsername(tokens["user"].username);
        this.registered = true;
        this.username = tokens['user'].username
        }
      ), catchError((error) => {
        console.log(Object.entries(error));
        this.errors.push(Object.entries(error.error).join('\n'))
        return this.errors;
      })
      );
  }
 
}
