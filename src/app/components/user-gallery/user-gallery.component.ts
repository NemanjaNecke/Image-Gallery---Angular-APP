import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageDetailsComponent } from '../image-details/image-details.component';
import { Image } from 'src/app/models/imageModel';
import { Profile } from 'src/app/models/user.model';
@Component({
  selector: 'app-user-gallery',
  templateUrl: './user-gallery.component.html',
  styleUrls: ['./user-gallery.component.css']
})
export class UserGalleryComponent implements OnInit {
  @Input()
  profile!:Profile;
  constructor(private modalService: NgbModal,) { }

  ngOnInit(): void {
  }
  open(image:Image) {
    const modalRef = this.modalService.open(ImageDetailsComponent);
    modalRef.componentInstance.image = image;
  }

}
