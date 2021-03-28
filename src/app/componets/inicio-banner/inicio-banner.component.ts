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

  constructor(private productSVC: ProductosService,
    private route: Router) { }

  ngOnInit(): void {
    this.productSVC.getAllLimitProducts(8).subscribe(res =>{
      res.forEach(val =>{
        this.productosLimit.push(val as ProductsI);
      });
    });

    this.year = new Date().getFullYear();

    this.mostrarCuenta();
  }

  showDetails(id: any, cate: any): void{
    this.route.navigate(['/detalles',cate,id]);
  }
  
  mostrarImg(url: any){
    this.url = url;
  }

  mostrarCuenta(): void{
    /*------------------
        CountDown
    --------------------*/
    // For demo preview start
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    if(mm == '12') {
        mm = '01';
        yyyy = yyyy + 1;
    } else {
        mm = String(parseInt(mm) + 1);
        mm = String(mm).padStart(2, '0');
    }
    var timerdate = mm + '/' + dd + '/' + yyyy;
    // For demo preview end


    // Uncomment below and use your date //

    /* var timerdate = "2020/12/30" */

	$("#countdown-time").countdown(timerdate, function(event:any) {
        $('#countdown-time').html(event.strftime("<div class='countdown__item'><span>%D</span> <p>Dias</p> </div>" + "<div class='countdown__item'><span>%H</span> <p>Horas</p> </div>" + "<div class='countdown__item'><span>%M</span> <p>Min</p> </div>" + "<div class='countdown__item'><span>%S</span> <p>Sec</p> </div>"));
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
}
