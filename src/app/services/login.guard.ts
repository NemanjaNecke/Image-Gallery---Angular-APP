import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree, NavigationEnd, RouterEvent, NavigationStart } from '@angular/router';
import { Observable, filter } from 'rxjs';
import { NgbAlert, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../components/popup/popup.component';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private login: LoginService, 
    private router: Router,
    private modalService: NgbModal,
    config: NgbModalConfig,) {
   
  }
  open() {
    const message = "You don't have permissions to access this page!";
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.message = message;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.login.isAuthenticated() == !true) {
      this.login.logout()
      this.open();
     return this.router.navigate(['/login'])
      
        
      }else{
        return this.login.isAuthenticated()
      }
      
      
  }
  }
  

