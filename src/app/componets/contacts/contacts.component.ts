import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MetasvcService } from '../../services/metasvc.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private title: Title,
    private seo: MetasvcService) {
    this.title.setTitle('Contactos');
   }

  ngOnInit(): void {
    this.seo.generateTags({
      title: 'Contactos',
      description: 'Contactanos a traves de nuestra redes solicales o aplicaciones de mensajeria',
      slug: 'contactos'
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


}
