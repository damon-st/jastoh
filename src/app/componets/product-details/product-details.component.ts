import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ImageUrlsI } from 'src/app/models/imageurl';
import { ProductsI } from 'src/app/models/product-model';
import { ProductosService } from 'src/app/services/productos.service';
import { Title } from '@angular/platform-browser';
import { MetasvcService } from '../../services/metasvc.service';
declare var $ : any;

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  produto: ProductsI[] = [];

  productos: ProductsI[] = [];

  urls: ImageUrlsI[] = [];

  imagem: string = '';

  cate: any;

  videoURL: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private producSvc: ProductosService,
              private title: Title,
              private seo: MetasvcService) {
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

  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit(): void {
  //   var modalClosingMethod = "Programmatically";

  //  $('#videoModal').on('click', (e) => {
  //   if ($(e.target).parent().attr("data-dismiss")){
  //     modalClosingMethod = "by Corner X";
  //   }
  //   else if ($(e.target).hasClass("btn-secondary")){
  //     modalClosingMethod = "by Close Button";
  //     console.log("btn");
  //   }
  //   else{
  //     modalClosingMethod = "by Background Overlay";
  //     console.log("afueraa");
      
  //   }
  //  });

  //   // Modal hidden event fired
  // $('#videoModal').on('hidden.bs.modal', function () {
  //   console.log("Modal closed "+modalClosingMethod);
  // });

  window.onpopstate = (e:any) => {
    // console.log("hoplaadads" + e);
    $('#videoModal').modal('hide');
    $('#exampleModal').modal('hide');

   };
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

      // this.title.setTitle(this.produto[0].title ? this.produto[0].title : 'Detalles del Producto');


      this.producSvc.getImages(cate,id).snapshotChanges().subscribe(res =>{
        this.urls = [];
        for(let x = 0; x < res.length ; x++){
          let url =  res[x].payload.toJSON();
          this.urls.push(url as any);
         // console.log(url);
          
        }

        //seo
        this.seo.generateTags({
          title: this.produto[0].title,
          description: this.produto[0].description,
          image: this.produto[0].imgPortada,
          slug: `detalles/${cate}/${id}`
        });

      });
      
    });

   

    this.producSvc.getProductsLimint(4,cate).valueChanges().subscribe(res =>{
        res.forEach(prod =>{
          this.productos.push(prod as ProductsI);
        });
    },error=>{
      console.log(error);
    });
   }

   myUrl:any;
   contactos(url: string){
     this.myUrl = 'https://variedadesjastho.web.app' +this.router.url;
    switch(url){
      case 'whatsapp':
        console.log(this.myUrl);
        
        window.open(`https://api.whatsapp.com/send?phone=593984334637&text=Me%20interesa%20este%20producto%20${this.myUrl}`,'_blanck');
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
    
    if(valor.includes('.mp4')){
      return 'video';
    }
    return 'image';
    
  }

}
