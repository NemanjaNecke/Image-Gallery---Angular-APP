import { UserResponse } from './../../models/user.model';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {

  form: FormGroup;

  errors: Error[] = [];
  usernName!: string;


  constructor(private fb: FormBuilder, private router: Router,
    private login: LoginService,) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]]
      ,
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

  }

  ngOnInit(): void {

  }
  close(error: any) {
    this.errors.splice(this.errors.indexOf(error), 1)
  }

  logIn(): void {
    const val = this.form.value;
    this.errors = [];

    this.login.login(val.username, val.password)
      .subscribe({
        next: (_val) => {
          this.router.navigate(['/home'], { queryParams: { loggedin: 'success' } })
          this.errors = this.login.errors;
        }
      });
  }


  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
}
