import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { IndexComponent } from './componets/index/index.component';
import { ContactsComponent } from './componets/contacts/contacts.component';
import { PodructosComponent } from './componets/podructos/podructos.component';


import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module


//firebase
import {AngularFirestoreModule}from '@angular/fire/firestore';
import {AngularFireStorageModule,BUCKET}from '@angular/fire/storage';
import { AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireModule} from '@angular/fire';
import { environment } from 'src/environments/environment';
import { ProductosService } from './services/productos.service';
import { DetailsComponent } from './componets/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    ContactsComponent,
    PodructosComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgxPaginationModule
  ],
  providers: [{provide:BUCKET,useValue:'gs://catalogo-juegos-dd8ec.appspot.com'},ProductosService],
  bootstrap: [AppComponent]
})
export class AppModule { }
