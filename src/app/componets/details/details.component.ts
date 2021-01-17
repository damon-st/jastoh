import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {map} from 'rxjs/operators';
import { ImageUrlsI } from 'src/app/models/imageurl';
import { ProductsI } from 'src/app/models/product-model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  produto: ProductsI[] = [];

  urls: ImageUrlsI[] = [{$key: ''}];

  constructor(private route:ActivatedRoute,
    private producSvc: ProductosService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const cate = this.route.snapshot.paramMap.get('cate');
    
   
    this.producSvc.productDetail(cate,id).valueChanges().subscribe(res=>{

      res.forEach(index =>{
        this.produto.push(index as ProductsI);
      })

      this.producSvc.getImages(cate,id).snapshotChanges().subscribe(res =>{
       

        for(let x = 0; x < res.length ; x++){
          const url =  res[x].payload.toJSON();
          this.urls[x].$key = url;
        }
      })
          

    });

  }

}
