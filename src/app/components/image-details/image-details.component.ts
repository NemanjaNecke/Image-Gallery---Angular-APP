import { ImagesService } from 'src/app/services/images.service';
import { Image, Category } from './../../models/imageModel';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.css']
})
export class ImageDetailsComponent implements OnInit {
  show = false;
  buttonName = 'Update Image';
  @Input()
  image!: Image;
  imageCategory!: Category[]
  constructor(public activeModal: NgbActiveModal,
    public imageService: ImagesService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.imageService.getCategories()
      .subscribe((res) => {
        this.imageCategory = res;
      });

  }
  refreshPage() {
    window.location.reload();
  }
  showUpdate() {
    this.show = !this.show;
    if (this.show) {

      this.buttonName = 'Hide update image';
    } else {
      this.buttonName = 'Update Image';
    }
  }
  open(msg: string) {
    const modalRef = this.modalService.open(PopupComponent);
    modalRef.componentInstance.message = msg;
  }
  delete(id: any) {
    this.imageService.deleteInstance(id).subscribe(data => {
      console.log(data);
      this.open('Deleted image Successfully.');
      setTimeout(() => {
        this.refreshPage()
        console.log('refreshed')
      }, 3000);

    })
  }

 

  matchCategory(id: any) {
    let name;

    for (let j in this.image.category) {

      if (id == this.imageCategory[j].id) {
        name = this.imageCategory[j].name
      }
    }
    return name;
  }
}
