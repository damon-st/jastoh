import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
 




@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers:[AuthService]
})
export class IndexComponent implements OnInit {

  constructor(private authSvc: AuthService,
    private title: Title) {
      this.title.setTitle('Jastoh')
     }

  ngOnInit(): void {
 
  }


  getAceptacion(): boolean{
   return this.authSvc.recuperarAceptacion();
  }

  aceptarCookies(){
    this.authSvc.aceptarCookies();
  }
  



}

