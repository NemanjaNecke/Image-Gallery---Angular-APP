import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { PopupComponent } from '../components/popup/popup.component';
import { LoginService } from './login.service';
import { RegistrationService } from './registration.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationGuardGuard implements CanActivate {
  constructor(private login: LoginService,
    private register: RegistrationService, 
    private router: Router,
    private modalService: NgbModal,
    ) {
   
  }
  open(message: any) {
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.message = message;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.register.registered) {
       
         return this.router.navigate(['/login']);   
        }
         this.open('There was a mistake') ; 
         return true;
  }
  
}
