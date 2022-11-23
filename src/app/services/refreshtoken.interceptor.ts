
import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, switchMap, map, throwError, catchError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { RegistrationService } from './registration.service';



const jwt = new JwtHelperService();



@Injectable()
export class RefreshtokenInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  errors = [];
  constructor(
    private inject: Injector
  ) {}

  intercept(request: HttpRequest<any>, 
    next: HttpHandler): Observable<HttpEvent<any>> {
      let authservice = this.inject.get(LoginService);
      let authreq = request;
      if(!authreq.url.includes('auth/login/') && !authreq.url.includes('auth/registration/')){
        authreq = this.AddTokenheader(request, authservice.getJwtToken());
      }
        
    return next.handle(authreq).pipe(
      catchError(errordata => {
       if(!authservice.isAuthenticated()){
          return this.handleRefreshToken(request, next);}
        if (errordata.status === 401) {
          // need to implement logout
          return this.handleRefreshToken(request, next);
        }
        if(errordata.status === 400){
          return throwError(() => new Error(Object.entries(errordata.error).join('\n')))
        }
        return throwError(() => new Error(Object.entries(errordata.error).join('\n')));
      })
    );
  
      
    }
    handleRefreshToken(request: HttpRequest<any>, next: HttpHandler) {
      let authservice = this.inject.get(LoginService);
      
      return authservice.postRefreshToken().pipe(
        switchMap((data: any) => {

          authservice.updateData(data.access);
          return next.handle(this.AddTokenheader(request,data.access))
        }),
        catchError(errordata=>{
          if(!request.url.includes('auth/registration/') || !request.url.includes('auth/login/')){
            authservice.logout();
          }
           //Error: headers,status,statusText,url,ok,name,message,error
          console.log(errordata, Error)
          return throwError(() => new Error(Object.entries(errordata.error).join('\n')))
        })
      );
    }
  
    AddTokenheader(request: HttpRequest<any>, token: any) {
      let authservice = this.inject.get(LoginService);
      if(authservice.getJwtToken() == undefined){
        return request;
      }else{
        return request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }
      
    }
  }
  