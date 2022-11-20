import { UserResponse } from './../../models/user.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
 
  //isLoggedIn$: Observable<boolean> = false;
  links = [
    { title: 'Home', fragment: 'home' },
    { title: 'Gallery', fragment: 'gallery' },
    { title: 'About', fragment: 'about'},
  ];

  constructor(public route: ActivatedRoute,
    private router: Router, 
    public login:LoginService) { }

  ngOnInit(): void {
    this.checkLogged();
 
  }

  logout() {
    this.login.logout();
  }


  

  checkLogged() {
    return this.login.isAuthenticated();

  }

}
