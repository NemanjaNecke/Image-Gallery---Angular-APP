import { Category } from './../../models/imageModel';
import { ImagesService } from './../../services/images.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';
import { JsonpClientBackend } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { jsDocComment } from '@angular/compiler';
import { PopupComponent } from '../popup/popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/services/account.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {
  isSubmitted = false;
  categories!: Category[];
  errors: any[] = [];
  id!: string | null;
  creator!: string;
  creatorID!: number;
  @Output() refreshPageEvent = new EventEmitter<Boolean>();
  @Output() scroll = new EventEmitter<any>()
  fileForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl('', [Validators.required]),
    alt: new FormControl('', [Validators.required, Validators.minLength(3)]),
    created: new FormControl('', [Validators.required]),
    image: new FormControl('', []),
    author: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required,]),
  });



  constructor(private fileupload: ImagesService,
    private modalService: NgbModal,
    private profile: AccountService,
    private login: LoginService) { }


  refreshPage() {
    this.refreshPageEvent.emit();
    return '';
  }

  ngOnInit(): void {
    this.fileupload.getCategories()
      .subscribe((res) => {
        this.categories = res;
      });
      this.id = this.login.getUserID() || null;
      this.profile.loadAcc(this.id).subscribe((resp)=>{
        this.creator = resp.user.username;
        this.creatorID = resp.id;
      }
      )
    this.scroll.emit();
    this.setOptions();
  }

  onSubmit() {
    this.isSubmitted = true;
    const formData = new FormData;
    formData.append('image', this.fileForm.get('image')!.value!);
    formData.append('title', this.fileForm.get('title')!.value!);
    formData.append('status', this.fileForm.get('status')!.value!);
    for (const cat of this.category!) {
      formData.append('category', cat)
    }

    formData.append('alt', this.fileForm.get('alt')!.value!);
    formData.append('created', this.fileForm.get('created')!.value!);
    formData.append('author', this.fileForm.get('author')!.value!);
    if (this.fileForm.valid) {
      this.fileupload.postImages(formData)
        .subscribe((res) => {
          // console.clear()
          this.errors = this.fileupload.errors;
          if (this.errors.length > 0) {
            this.errors;
          } else {

            this.open();
            this.fileForm.reset;
            setTimeout(() => {
              this.refreshPage()
              console.log('refreshed')
            }, 3000);
            return;
          }
        })
    }


  }
  open() {
    const message = 'Uploaded Successfully.';
    const comp = 'upload';
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.comp = comp;
  }

  get category() {
    return this.fileForm.get('category')?.value;
  }
  setOptions() {
    this.fileForm.get('status')!.patchValue('active');
    this.fileForm.get('author')!.patchValue(this.creator)
  }
  //   onCategoryChange() {
  //     //let categories: Category = this.category!.value;
  //     for (const cat of this.category!){
  //       console.log(cat );
  //     }

  //  } 
  close(error: any) {
    this.errors.splice(this.errors.indexOf(error), 1)
  }

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // this.fileForm.patchValue({
      //   image: file.type
      // });
      this.fileForm.get('image')!.setValue(file);
    }
  }

}
