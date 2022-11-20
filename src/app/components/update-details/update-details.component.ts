import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { Category, Image } from 'src/app/models/imageModel';
import { AccountService } from 'src/app/services/account.service';
import { ImagesService } from 'src/app/services/images.service';
import { LoginService } from 'src/app/services/login.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent implements OnInit {
  @Input()
  categories!: Category[];
  @Output() refreshPageEvent = new EventEmitter<Boolean>();
  @Output() closeModal = new EventEmitter<any>();
  @Output() writeSuccess = new EventEmitter<string>();
  @Input()
  id!: any;
  @Input()
  image!: Image;
  userid!: string | null;
  isSubmitted = false;
  creator!: string;
  creatorID!: number;
  fileForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    category: new FormControl('', [Validators.required]),
    alt: new FormControl('', [Validators.required, Validators.minLength(3)]),
    created: new FormControl('', [Validators.required,]),
    image: new FormControl('',),
    author: new FormControl('', [Validators.required,]),
    status: new FormControl('', [Validators.required]),
  });
  constructor(private fileupload: ImagesService,
    private login: LoginService,
    private profile: AccountService,) { }

  closeParentModal() {
    this.closeModal.emit();
    
  }
  refreshPage() {
    this.refreshPageEvent.emit();
  }

  ngOnInit(): void {
    // this.fileupload.getCategories()
    // .subscribe((res) => {
    //   this.categories = res;
    // });
    this.userid = this.login.getUserID() || null;
    this.profile.loadAcc(this.id).subscribe((resp)=>{
      this.creator = resp.user.username;
      this.creatorID = resp.id;
    }
    )
    this.setOptions();
  }
  setOptions() {
    this.fileForm.get('status')!.patchValue(this.image.status);
    this.fileForm.get('author')!.patchValue(this.image.author.toString());
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
      this.fileupload.updateDetails(this.id, formData)
        .subscribe(res => {
          this.writeSuccess.emit('Image updated succesfully');
          //open('Uploaded Successfully.');
          setTimeout(() => {
            this.refreshPage()
          }, 3000);
        })
    }
  }

  get category() {
    return this.fileForm.get('category')?.value;
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
