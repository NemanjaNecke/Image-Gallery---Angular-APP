import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from 'src/app/models/imageModel';
import { ImagesService } from 'src/app/services/images.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {
  @Output() chooseCategory = new EventEmitter();
  @Output() selectAllCategories = new EventEmitter();
  @Output() refreshForCategories = new EventEmitter();
  id: number = 1;
  categories!: Category[];
  catform: FormGroup;
  constructor(private categoriesServ: ImagesService,
    private fb: FormBuilder) {
    this.catform = this.fb.group({
      name: ['']
    })
  }

  ngOnInit(): void {
    this.categoriesServ.getCategories()
      .subscribe((res) => {
        this.categories = res;
      });
  }

  getImagesByCategory(id: number) {
    this.chooseCategory.emit(id);
  }

  getImages() {
    this.selectAllCategories.emit();
  }

  addCategory() {
    let val = this.catform.value;
    console.log(val)
    this.categoriesServ.addCategory(val.name).subscribe((response) => {
      this.refreshForCategories.emit()
      this.catform.reset();
    });
  }
  deleteCategory(id: any) {
    this.categoriesServ.deleteCategory(id).subscribe((response) => {
      this.refreshForCategories.emit()
    }
    )
  }
}
