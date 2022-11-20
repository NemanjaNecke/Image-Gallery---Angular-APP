
import { ApiPaths, environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Image } from '../models/imageModel';
import { map, Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ImagesService {
 
  baseUrl = environment.baseUrl;
  apiKey = environment.apiKey;
  getAll = environment.apipaths.Getall;
  getCategory = environment.apipaths.Getcategory;
  getByCategory = environment.apipaths.GetImagesByCategory;
  errors: any[] = [];

  constructor(private http: HttpClient) { }

  getImages()  {
    return this.http
    .get<{[key:number]:Image}>(this.baseUrl + this.getAll + '?api_key=' + this.apiKey)
    .pipe(
      map((responseData) => {
        const images:Image[] = [];
        for (const key in responseData){
          if (responseData.hasOwnProperty(key)){ 
            images.push( {...responseData[key]} ) ;
          }
        }
      return images;
      })
    )
    
  }

  getCategories() {
    return this.http.
    get<Category[]>(this.baseUrl + this.getCategory + '?api_key=' + this.apiKey)
    .pipe(
      map((res) => {
       const categories: Category[] = [];
        for(const id in res){
          if(res.hasOwnProperty(id)){
           categories.push({...res[id]});
          }
        }
        return categories;
      })
    );
  }


  getImagesByCategory(id:number) {
      return this.http.
      get<{[key:number]:Image}>(this.baseUrl + this.getByCategory + id + '/?api_key=' + this.apiKey)
      .pipe(
        map((responseData) => {
          const images:Image[] = [];
          for (const key in responseData){
            if (responseData.hasOwnProperty(key)){ 
              images.push( {...responseData[key]} ) ;
            }
          }
        return images;
        })
      )
  }

 
  postImages(postData: FormData) {
    return this.http
    .post(this.baseUrl + this.getAll + '?api_key=' + this.apiKey, postData)
    .pipe(catchError((error) => {

      this.errors.push(error)
      return this.errors;
    }));
  }

  addCategory(name:string){
    return this.http.post(this.baseUrl + this.getCategory, {name});
  }

  deleteCategory(id:any){
    return this.http.delete(this.baseUrl + this.getCategory + id +'/')
  }

  updateDetails(id: any, postData: FormData) {
    return this.http
    .patch(this.baseUrl + this.getAll + id +'/?api_key='+ this.apiKey, postData)
    .pipe(catchError((error) => {
      console.log(error);
      this.errors.push(error)
      return this.errors;
    }));
  }

  deleteInstance(id: any) {
    return this.http.delete(this.baseUrl + this.getAll + id +'/?api_key=' + this.apiKey);
  }
}
