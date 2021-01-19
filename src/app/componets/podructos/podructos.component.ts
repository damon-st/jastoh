import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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

  search = new FormGroup({buscar: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(30)
  ])});

  pageActual: number = 1;
  totalItems: number =0;

  loading: boolean = true;
  
  constructor(private prodSVC: ProductosService,
    private route: Router,
    private title: Title) {
      this.title.setTitle('Productos')
     }

  ngOnInit(): void {
   this.getProduct('Mujer');
  }


  getProduct(ref: string): void{
    this.productos = [];
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


  productDetail(id: any, cate: any): void{
    this.route.navigate(['/detalles', cate, id]);
  }

  buscar(form: Serach): void{
   this.productos = [];
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
