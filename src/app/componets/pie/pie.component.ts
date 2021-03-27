import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  year: number = 0;
  constructor() { }

  ngOnInit(): void {
    this.year = new Date().getFullYear();
  }

  contactos(url: string){
   switch(url){
     case 'whatsapp':
       
       window.open(`https://api.whatsapp.com/send?phone=593984334637&text=Me%20interesa%20sus%20productos%20`,'_blanck');
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
