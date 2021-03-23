import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import {ReCaptchaV3Service} from 'ngx-captcha';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'jastho';

  constructor(private recapcha: ReCaptchaV3Service,
    private authSvc: AuthService){}


  ngOnInit(): void {
    this.recapcha.execute(environment.llave.key,'homepage', (token) => {
      // console.log("this token" + token);
      
    });
  }

  getAceptacion(): boolean{
    return this.authSvc.recuperarAceptacion();
   }
 
   aceptarCookies(){
     this.authSvc.aceptarCookies();
   }
  
}
