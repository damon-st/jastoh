import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import {AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { ProductsI } from '../models/product-model';
import { BlogI } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  public blog: BlogI = {};
  constructor(private db: AngularFireDatabase,
   private storate: AngularFireStorage) { }

   

  productos(categoria: any){
  // const ref =  this.db.database.ref('Ropa').child(categoria).orderByChild('title').startAt('yy').endAt('yy'+'\uf8ff');
 // const ref =  this.db.database.ref('Ropa').child(categoria);
  return this.db.list('Ropa', query => query.orderByChild('category').startAt(categoria).endAt(categoria+'\uf8ff')).valueChanges();
  }

  productDetail(cate:any ,id: any){
    return this.db.list('Ropa',query=> query.orderByChild('id').equalTo(id));
  }

  getImages(cate:any ,id: any){
    const d =  this.db.list('Ropa',query=> query.child(cate).orderByChild('id').equalTo(id));
  
    const ref =  this.db.database.ref('Ropa').child(id).child('url');

    return this.db.list(ref);
  }

  getProductsLimint(limit: any,cat: any){
 //   const ref = this.db.database.ref('Ropa').child(cat).limitToLast(limit);
    return this.db.list('Ropa',query=>query.orderByChild('category').startAt(cat).endAt(cat+'\uf8ff').limitToLast(limit));
  }

  searchProduc(title: string){
    return this.db.list('Ropa', query => query.orderByChild('title').startAt(title).endAt(title + '\uf8ff'));
  }


  getCategorys(){
    return this.db.list('Categorias').valueChanges();
  }

  getBlogsCategorys(){
    return this.db.list('BlogCategorias').valueChanges();
  }


  deleteImg(url: any){
   return this.storate.refFromURL(url).delete();
  
  }

   getAllProducts(){
    return this.db.list('Ropa',query => query.limitToFirst(200)).valueChanges();
  }

  getAllLimitProducts(limit:any){
    return this.db.list('Ropa',query => query.limitToLast(limit)).valueChanges();
  }

  async createProduct(product: ProductsI){
    const key = await  this.db.list('Ropa').push(product);

   const up = await this.db.list('Ropa').update(key,{
      id: key.key
    });
    return up;
  }

  async createBlog(blog: BlogI){
    const key = await  this.db.list('Blogs').push(blog);

   const up = await this.db.list('Blogs').update(key,{
      id: key.key
    });
    return up;
  }

  updateBlog(id:any,blog:BlogI){
    return this.db.list('Blogs').update(id,blog);
  }
  
  getAllBlogs(limit: any){
    return this.db.list('Blogs',query => query.limitToFirst(limit)).valueChanges();
  }

  getBlogDetails(id:any){
    return this.db.list('Blogs',query  => query.orderByChild('id').equalTo(id)).valueChanges();
  }

  getBlogsQueryCategories(cat:any){
    return this.db.list('Blogs',query  => query.orderByChild('category').startAt(cat).endAt(cat+'\uf8ff').limitToFirst(3)).valueChanges();
  }


  deleteBlog(id:any){
    return this.db.list('Blogs',query => query.orderByChild('id').equalTo(id)).remove();
  }


}
