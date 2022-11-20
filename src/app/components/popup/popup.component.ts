import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input()
  message!: string;
  @Input()
  comp!:string;
  @Input()
  registered!: boolean;

  types: string[] = [
    'danger',
    'success'
  ]
  constructor(public activeModal: NgbActiveModal) { }
  checkOrigin(){
    if(this.comp == 'upload' || 
    this.message == 'Deleted image Successfully.' ||
    this.message == 'Image updated succesfully' ||
    (this.comp == 'registration' && this.registered ) ||
    (this.comp == 'resetpass')){
      return this.types[1];
    } 
    return this.types[0];
  }
  ngOnInit(): void {
  }

}
