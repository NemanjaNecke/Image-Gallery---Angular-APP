import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Profilepic } from 'src/app/models/user.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-pic-choose',
  templateUrl: './pic-choose.component.html',
  styleUrls: ['./pic-choose.component.css']
})
export class PicChooseComponent implements OnInit {
  @Input()
  pic!: Profilepic[];

  constructor(public activeModal: NgbActiveModal,
    private acc: AccountService) { }

  ngOnInit(): void {
  
  }
  choosePic(id:any){
    this.activeModal.close(id)
  }
  delete(id:any){
    this.acc.deletePic(id).subscribe(
      (response) => {
        this.acc.choosePic(this.pic[0].profile).subscribe(
        (response:Profilepic[])=>{
          this.pic = response;

        })
      }
      
    )
  }

}
