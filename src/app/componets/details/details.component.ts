import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import {map} from 'rxjs/operators';
import { ImageUrlsI } from 'src/app/models/imageurl';
import { ProductsI } from 'src/app/models/product-model';
import { ProductosService } from 'src/app/services/productos.service';
import  {pairwise}from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


  produto: ProductsI[] = [];

  productos: ProductsI[] = [];

  urls: ImageUrlsI[] = [];

  imagem: string = '';

  cate: any;

  videoURL: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private producSvc: ProductosService,
              private title: Title) {
               }

  ngOnInit(): void {
    this.title.setTitle('Detalles del Producto');

    const id = this.route.snapshot.paramMap.get('id');
    this.cate = this.route.snapshot.paramMap.get('cate');
    
    this.getProduct(this.cate,id);
    

    this.router.events.subscribe((events)=>{

      if(events instanceof NavigationStart){
      }

      if(events instanceof NavigationEnd){
        window.scrollTo({top: 0,behavior: 'smooth'});
        const id = this.route.snapshot.paramMap.get('id');
        const cate = this.route.snapshot.paramMap.get('cate');
      
        this.getProduct(cate,id);
      }
    });

  }

   mostrar(img: any){
     this.imagem = img;
   }

   mostrarVideo(video: any){
     this.videoURL = video;
   }


   getProduct(cate: any, id: any){
    this.produto = [];
    this.urls= [];
    this.productos = [];
    this.producSvc.productDetail(cate,id).valueChanges().subscribe(res=>{

      res.forEach(index =>{
        this.produto.push(index as ProductsI);
      })

      this.producSvc.getImages(cate,id).snapshotChanges().subscribe(res =>{
        for(let x = 0; x < res.length ; x++){
          let url =  res[x].payload.toJSON();
          this.urls.push(url as any);
         // console.log(url);
          
        }
      });
      
    });
    this.producSvc.getProductsLimint(3,cate).valueChanges().subscribe(res =>{
        res.forEach(prod =>{
          this.productos.push(prod as ProductsI);
        });
    },error=>{
      console.log(error);
    });
   }


   contactos(url: string){
    switch(url){
      case 'whatsapp':
        window.open('https://api.whatsapp.com/send?phone=593984334637&text=Me,%20Interesa%20sus%20productos%20','_blanck');
        break;
      case 'instagram':
        window.open('https://www.instagram.com/variedadesjastoh/?igshid=v5r52ujztizn','_blanck');
        break;  

      case 'telegram':
        window.open('https://t.me/JasminCevallos','_black');
        break;  
    }
  }


  relacionadosProductos(cate: any, id:any){
    this.router.navigate(['/detalles',cate,id]);
  }

  isVideoOImage(valor: any) : string{
    console.log(valor);
    
    if(valor.includes('.mp4')){
      return 'video';
    }
    return 'image';
    
  }

}
