import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import {ProductsI} from '../../models/product-model';

@Component({
  selector: 'app-podructos',
  templateUrl: './podructos.component.html',
  styleUrls: ['./podructos.component.css']
})
export class PodructosComponent implements OnInit {
 

  productos: ProductsI[] = [];

  
  constructor(private prodSVC: ProductosService,
    private route: Router) { }

  ngOnInit(): void {
   this.getProduct('Mujer');
  }


  getProduct(ref: string){
    this.productos = [];
    this.prodSVC.productos(ref).subscribe(res=>{
      res.forEach(val =>{
        this.productos.push(val as ProductsI);
      });
    
    },
    error =>{
      console.log(error);
      
    }
    );
  }


  productDetail(id: any,cate:any){
    this.route.navigate(['/detalles',cate,id]);
  }
}
