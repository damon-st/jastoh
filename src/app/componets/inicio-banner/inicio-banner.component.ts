import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ProductsI } from '../../models/product-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-banner',
  templateUrl: './inicio-banner.component.html',
  styleUrls: ['./inicio-banner.component.css']
})
export class InicioBannerComponent implements OnInit {


  productosLimit:ProductsI[] = [];
  url:any;

  constructor(private productSVC: ProductosService,
    private route: Router) { }

  ngOnInit(): void {
    this.productSVC.getAllLimitProducts(8).subscribe(res =>{
      res.forEach(val =>{
        this.productosLimit.push(val as ProductsI);
      });
    });
  }

  showDetails(id: any, cate: any): void{
    this.route.navigate(['/detalles',cate,id]);
  }
  
  mostrarImg(url: any){
    this.url = url;
  }
}
