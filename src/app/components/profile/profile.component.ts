import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Profile, Profilepic } from 'src/app/models/user.model';

import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
import { PicChooseComponent } from '../pic-choose/pic-choose.component';
import { PopupComponent } from '../popup/popup.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id!: string | null;
  profile!: Profile;
  accountType!: string;
  edit: boolean = false;
  form!: FormGroup;
  picForm = new FormGroup({
    profilePic: new FormControl('', []),
  });
  error!: any[];
  profilePicArr!: Profilepic[];
  picShown!: Profilepic;

  constructor(private acc: AccountService,
    private login: LoginService,
    private fb: FormBuilder,
    private modalService: NgbModal) {
    this.form = this.fb.group({
      username: ['',],
      firstName: ['',],
      lastName: ['',],
      email: ['', [Validators.email]],
    });
  }
  showPic(id?: any) {
    this.acc.selectedPic(id).subscribe( (response:any)=>{
      this.picShown = response;
    })
  }
  ngOnInit(): void {
    this.id = this.login.getUserID() || null;
    this.acc.loadAcc(this.id).subscribe((resp) => {
      this.profile = resp;
      this.accType();
      //this.showPic()
      for(let i = 0; i< this.profile.profilepic.length; i++){
        if(this.profile.profilepic[i].selected == true){
          this.picShown = this.profile.profilepic[i];
        }
      }
      
    }
    )

  }
  accType() {
    if (this.profile.user.is_staff == true) {
      this.accountType = 'Admin account';
    } else {
      this.accountType = 'User account';
    }
  }

  makeEditable() {
    this.edit = !this.edit;
  }

  fakeAPIcall() {
    this.acc.fakeCall().subscribe(() => {
    });
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  open(message?: any, pic?: Profilepic[]) {
    if (message) {
      const modalRef = this.modalService.open(PopupComponent);
      modalRef.componentInstance.message = message;
    }
    if (message == undefined && pic) {
      const modalRef = this.modalService.open(PicChooseComponent);
      modalRef.componentInstance.pic = pic;
      modalRef.closed.subscribe((result: any) => {
        window.location.reload()
        this.showPic(result)
      })
      modalRef.dismissed.subscribe((result) => {
        window.location.reload()
      })
    }

  }
  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];

      this.picForm.get('profilePic')!.setValue(file);
    }
  }
  updateProfilePic() {
    const formData = new FormData;
    formData.append('pic', this.picForm.get('profilePic')!.value!);
    formData.append('profile', this.id!.toString());
    formData.append('selected', 'true')
    if (this.picForm.get('profilePic')!.value !== '') {
      this.acc.updateProfilePic(formData).subscribe(
        (response: any) => {
          if (this.acc.errors.length > 0) {
            this.error = response;
            console.log(this.error)
            this.edit = false;
            this.open(this.error)
          } else {
            this.profile.profilepic[this.profile.profilepic.length - 1].pic = response.pic;
            this.edit = false;
            this.form.reset();
          }
        }
      )
    } else {
      this.open('Please provide a profile picture!');
      this.edit = false;
      this.form.reset();
    }

  }
  updateAcc() {
    let username;
    let email;
    let firstname;
    let lastname;
    let val = this.form.value;
    if (val.username) {
      username = val.username;
    } else {
      username = this.profile.user.username;
    }
    if (val.email) {
      email = val.email;
    } else {
      email = this.profile.user.email;
    }
    if (val.firstName) {
      firstname = val.firstName;
    } else {
      firstname = this.profile.user.first_name;
    }
    if (val.lastName) {
      lastname = val.lastName;
    } else {
      lastname = this.profile.user.last_name;
    }

    this.acc.updateAcc(this.id, username, email, firstname, lastname)
      .subscribe((response) => {
        this.profile.user = response;
        this.edit = false;
        this.form.reset();
      })
  }
  choosePic() {
    this.acc.choosePic(this.id).subscribe((response: any) => {
      this.profilePicArr = response;
      this.open(undefined, this.profilePicArr)

    })

  }

}
