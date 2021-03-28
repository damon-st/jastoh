import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {ReCaptchaV3Service} from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';


declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'jastho';

  constructor(private recapcha: ReCaptchaV3Service,
    private authSvc: AuthService){
    }


  ngOnInit(): void {
    this.recapcha.execute(environment.llave.key,'homepage', (token) => {
      // console.log("this token" + token);
      
    });
  
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
        var btn = $('#button');

    $(window).scroll(function() {
      if ($(window).scrollTop() > 300) {
        btn.addClass('show');
      } else {
        btn.removeClass('show');
      }
    });

    btn.on('click', function(e:any) {
      e.preventDefault();
      $('html, body').animate({scrollTop:0}, '300');
    });
  }

  getAceptacion(): boolean{
    return this.authSvc.recuperarAceptacion();
   }
 
   aceptarCookies(){
     this.authSvc.aceptarCookies();
   }
  
   
}
