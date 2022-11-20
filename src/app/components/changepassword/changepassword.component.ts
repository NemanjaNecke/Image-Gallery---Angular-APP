import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/services/login.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  errors: Error[] = [];

  constructor(private fb: FormBuilder, private router: Router,
    private login: LoginService,
    private ngbModal: NgbModal) {this.changePass = this.fb.group({
    password1: ['', [Validators.required, Validators.minLength(8)]]
    ,
    password2: ['', [Validators.required, Validators.minLength(8)]]
  }) }

  ngOnInit(): void {
  }

  open(msg:any){
    const comp = 'resetpass';
    const modalRef = this.ngbModal.open(PopupComponent);
    modalRef.componentInstance.message = msg;
    modalRef.componentInstance.comp = comp;
  }
  close(error: any) {
    this.errors.splice(this.errors.indexOf(error), 1)
  }
  passShow() {
    this.forgotPassword = !this.forgotPassword;
  }
  changePass: FormGroup;
  forgotPassword!: boolean;
 get password1() {
    return this.changePass.get('password1');
  }
  get password2() {
    return this.changePass.get('password2');
  }
  get f1(): { [key: string]: AbstractControl } {
    return this.changePass.controls;
  }
  resetPassword(){
    let password1 = this.changePass.get('password1')!.value;
    let password2 = this.changePass.get('password2')!.value;
    this.login.resetPassword(password1,password2).subscribe(
      (response:any) => {
        if(this.login.errors.length > 0) {
          this.errors = this.login.errors;
          this.changePass.reset()
        }else{
          console.log(response)
          this.open(response.detail);
          setTimeout(() => {
            this.router.navigate(['/profile'])
          }, 1200);
          
        }
        
        
      }
    )
  }
}
