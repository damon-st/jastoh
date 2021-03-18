import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { MetasvcService } from '../../services/metasvc.service';
 




@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers:[AuthService]
})
export class IndexComponent implements OnInit {

  constructor(private authSvc: AuthService,
    private title: Title,
    private seo: MetasvcService) {
      this.title.setTitle('Jastoh')
     }

  ngOnInit(): void {
      this.seo.generateTags({
        title: 'Variedades Jastoh',
        description:'Productos para hombre mujer hogar y variedades',
        slug:'inicio'
      });
  }


  getAceptacion(): boolean{
   return this.authSvc.recuperarAceptacion();
  }

  aceptarCookies(){
    this.authSvc.aceptarCookies();
  }
  



}

