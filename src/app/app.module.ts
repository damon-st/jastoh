import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componets/navbar/navbar.component';
import { IndexComponent } from './componets/index/index.component';
import { ContactsComponent } from './componets/contacts/contacts.component';
import { PodructosComponent } from './componets/podructos/podructos.component';

//froms
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

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
import { ErrorpageComponent } from './componets/errorpage/errorpage.component';
import { LoginComponent } from './componets/login/login.component';
import { AuthService } from './services/auth.service';
import { CrearproductoComponent } from './componets/crearproducto/crearproducto.component';

import {NgxCaptchaModule} from 'ngx-captcha';
import { PieComponent } from './componets/pie/pie.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    ContactsComponent,
    PodructosComponent,
    DetailsComponent,
    ErrorpageComponent,
    LoginComponent,
    CrearproductoComponent,
    PieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  providers: [{provide:BUCKET,useValue:'gs://variedadesjastho.appspot.com'},ProductosService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
