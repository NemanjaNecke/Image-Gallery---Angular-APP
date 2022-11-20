import { ImageDetailsComponent } from './../image-details/image-details.component';
import { ImagesService } from './../../services/images.service';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Image } from './../../models/imageModel'
import { NgbActiveModal, NgbCarouselConfig, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  document = document;
  imagesArray: Image[] = [];
  imagesByCategory: Image[] = [];
  show: Boolean = false;
  buttonName = 'Upload Images';
  loading: boolean = false;
  target = document.getElementById('show');

  constructor(private images: ImagesService,
    private modalService: NgbModal,
    private acc: AccountService,
    config: NgbModalConfig,
    configCarousel: NgbCarouselConfig,
  ) {
    config.backdrop = true;
    config.size = 'xl';
    configCarousel.interval = 100000000;
    configCarousel.showNavigationIndicators = true;
  }

  ngOnInit(): void {

    this.images.getImages().subscribe((data: Image[]) => {
      this.imagesArray = data;
    });
  }


  open(image: Image) {
    const modalRef = this.modalService.open(ImageDetailsComponent);
    modalRef.componentInstance.image = image;
  }

  refreshPage() {
    window.location.reload();
  }

  showUpload() {
    this.show = !this.show;
    if (this.show) {
      this.buttonName = 'Hide update image form';
    } else {
      this.buttonName = 'Upload Images';
    }
  }

  scroll() {
    const target = document.getElementById('show');
    console.log('catch target', target)
    target?.scrollIntoView({ behavior: 'smooth' });
  }

  getImagesCategory(id: number) {
    this.images.getImagesByCategory(id).subscribe((data: Image[]) => {
      this.imagesArray = data;
    });
  }

  getImages() {
    this.images.getImages().subscribe((data: Image[]) => {
      this.imagesArray = data;
    });
  }
  stayLogged(){
    this.acc.fakeCall()
  }
}
