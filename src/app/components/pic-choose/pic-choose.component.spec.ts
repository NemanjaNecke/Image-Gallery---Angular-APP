import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicChooseComponent } from './pic-choose.component';

describe('PicChooseComponent', () => {
  let component: PicChooseComponent;
  let fixture: ComponentFixture<PicChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicChooseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
