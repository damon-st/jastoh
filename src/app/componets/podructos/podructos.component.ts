import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CategoryI } from 'src/app/models/categorias';
import { ProductosService } from 'src/app/services/productos.service';
import {ProductsI} from '../../models/product-model';


export interface Serach{
  buscar: string;
}

@Component({
  selector: 'app-podructos',
  templateUrl: './podructos.component.html',
  styleUrls: ['./podructos.component.css']
})
export class PodructosComponent implements OnInit {
 

  productos: ProductsI[] = [];
  categorys: CategoryI[] = [];

  search = new FormGroup({buscar: new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(30)
  ])});

  pageActual: number = 1;
  totalItems: number =0;

  loading: boolean = true;

  buscarPor: string = '';
  
  constructor(private prodSVC: ProductosService,
    private route: Router,
    private title: Title) {
      this.title.setTitle('Productos')
      this.buscarPor = 'Todo';
     }

  ngOnInit(): void {
  //  this.getProduct(this.buscarPor);
  this.getAllProduct();
   this.getCategorys();
  }

  getAllProduct(){
    this.productos = [];
    this.prodSVC.getAllProducts().subscribe(res => {
      res.forEach(val => {
        this.productos.push(val as ProductsI);
      });
      this.totalItems = this.productos.length;
      this.loading = false;
    })
  }


  getProduct(ref: any): void{
    this.productos = [];
    this.buscarPor = ref;
    this.prodSVC.productos(ref).subscribe(res=>{
      res.forEach(val =>{
        this.productos.push(val as ProductsI);
      });
      this.totalItems = this.productos.length;
      this.loading = false;
    },
    error =>{
      console.log(error);
      this.loading = false;
    }
    );
  }

  getCategorys():void{
    this.prodSVC.getCategorys().subscribe(res =>{
      res.forEach(cate =>{
        this.categorys.push(cate as CategoryI);  
      });
    },error=>{console.log(error);});
  }

  productDetail(id: any, cate: any): void{
    this.route.navigate(['/detalles', cate, id]);
  }

  buscar(form: Serach): void{
   this.productos = [];
   this.buscarPor = form.buscar;
   this.prodSVC.searchProduc(form.buscar.toLocaleLowerCase()).valueChanges().subscribe(res => {
    res.forEach(val =>{
      this.productos.push(val as ProductsI);
    });
    this.totalItems = this.productos.length;
    this.loading = false;
   }, error => {
    console.log(error);
    
   });
  }
}
