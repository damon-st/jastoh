import { Injectable } from '@angular/core';
import {AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ProductsI } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private db: AngularFireDatabase) { }


  productos(categoria: string){
  // const ref =  this.db.database.ref('Ropa').child(categoria).orderByChild('title').startAt('yy').endAt('yy'+'\uf8ff');
  const ref =  this.db.database.ref('Ropa').child(categoria);
  return this.db.list(ref).valueChanges();
  }

  productDetail(cate:any ,id: any){
    return this.db.list('Ropa',query=> query.child(cate).orderByChild('id').equalTo(id));
  }

  getImages(cate:any ,id: any){
    const d =  this.db.list('Ropa',query=> query.child(cate).orderByChild('id').equalTo(id));
  
    const ref =  this.db.database.ref('Ropa').child(cate).child(id).child('url');

    return this.db.list(ref);
  }

}
