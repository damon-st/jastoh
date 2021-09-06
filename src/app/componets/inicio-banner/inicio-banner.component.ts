import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../services/productos.service';
import { ProductsI } from '../../models/product-model';
import { Router } from '@angular/router';
declare var $ :any;
@Component({
  selector: 'app-inicio-banner',
  templateUrl: './inicio-banner.component.html',
  styleUrls: ['./inicio-banner.component.css']
})
export class InicioBannerComponent implements OnInit {


  productosLimit:ProductsI[] = [];
  url:any;

  year: any;
  producto: ProductsI = {};

  constructor(private productSVC: ProductosService,
    private route: Router) { }

  ngOnInit(): void {
    this.productSVC.getAllLimitProducts(8).subscribe(res =>{
      this.productosLimit = [];
      res.forEach(val =>{
        this.productosLimit.push(val as ProductsI);
      });
    });

    this.year = new Date().getFullYear();

    this.mostrarCuenta();
  }

  showDetails(id: any, cate: any): void{
    this.route.navigate(['productos/detalles',cate,id]);
  }
  
  mostrarImg(product: ProductsI){
    this.producto = product;
  }

  mostrarCuenta(): void{
    /*------------------
        CountDown
    --------------------*/
    // For demo preview start
    // var today = new Date();
    // var dd = String(today.getDate()).padStart(2, '0');
    // var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    // var yyyy = today.getFullYear();

    // if(mm === '12') {
    //     mm = '01';
    //     yyyy = yyyy + 1;
    // } else {
    //     mm = String(parseInt(mm) + 1);
    //     mm = String(mm).padStart(2, '0');
    // }
    // var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end


    // Uncomment below and use your date //

    /* var timerdate = "2020/12/30" */
    var time = new Date(2021,11,30);
    // var time = new Date(2021,2,29,12,16,0);

    
    
    

	$("#countdown-time").countdown(time, function(event:any) {
        $('#countdown-time').html(event.strftime("<div class='countdown__item'><span>%D</span> <p>Dias</p> </div>" + "<div class='countdown__item'><span>%H</span> <p>Horas</p> </div>" + "<div class='countdown__item'><span>%M</span> <p>Min</p> </div>" + "<div class='countdown__item'><span>%S</span> <p>Sec</p> </div>"));
    
      }).on('finish.countdown',() =>{
        $('#contador').hide();
      });
    /*--------------------------
        Banner Slider
    ----------------------------*/
    $(".banner__slider").owlCarousel({
      loop: true,
      margin: 0,
      items: 1,
      dots: true,
      smartSpeed: 1200,
      autoHeight: false,
      autoplay: true
  });

    
  }

  
  myUrl:any;

  contactos(prodcuto: ProductsI,url: any){
    this.myUrl = 'https://variedadesjastho.com/productos/detalles/' +this.producto.category+"/" + prodcuto.id;
   switch(url){
     case 'whatsapp':
       
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
}
