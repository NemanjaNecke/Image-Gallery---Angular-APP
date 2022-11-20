import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationService } from 'src/app/services/registration.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form:FormGroup;
  errors: any[] = [];
  usernName!: string;


  constructor(private fb:FormBuilder,private router: Router, 
    private registrate:RegistrationService,
    private modalService: NgbModal) {
    this.form = this.fb.group({
      username: ['',[Validators.required,Validators.minLength(5)]]
      ,
      password1: ['',[Validators.required, Validators.minLength(8)]],
      password2: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]]
  });
  
   }
   open(message: string, registered: boolean) {
    const comp = 'registration';
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.comp = comp;
    modalRef.componentInstance.registered = registered;
  }
  ngOnInit(): void {
   
  }
  close(error: any){
    this.errors.splice(this.errors.indexOf(error), 1)
  }


  registration(): void{
    const val = this.form.value;
    this.errors = [];
  
        this.registrate.registrate(val.username, val.password1, val.password2, val.email)
          .subscribe(
            (_val) => {
              if(this.registrate.errors.length>0){
                this.errors = this.registrate.errors;
              }
              if(this.registrate.registered){
                this.open(`You were succesfully registered ${this.registrate.username}. Please login with the username and password you provided.`, this.registrate.registered); 
                this.router.navigate(['/login'], { queryParams: { registered: 'success' } }); 
              }

            }
            
          );

  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password1');
  }
  get confirmPassword(){
    return this.form.get('password2')
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  get email(){
    return this.form.get('email');
  }
}
