import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { PopupComponent } from '../components/popup/popup.component';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(private login: LoginService, 
    private modalService: NgbModal,
    private router: Router,){}
  open() {
    const message = "You are already logged in!";
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.message = message;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.login.isAuthenticated()){
        this.open();
        this.router.navigate(['/home']);
      }
    return true;
  }
  
}
