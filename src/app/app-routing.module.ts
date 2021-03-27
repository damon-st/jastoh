import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './componets/contacts/contacts.component';
import { CrearproductoComponent } from './componets/crearproducto/crearproducto.component';
import { DetailsComponent } from './componets/details/details.component';
import { ErrorpageComponent } from './componets/errorpage/errorpage.component';
import { IndexComponent } from './componets/index/index.component';
import { LoginComponent } from './componets/login/login.component';
import { PodructosComponent } from './componets/podructos/podructos.component';
import { AuthGuard } from './guards/auth.guard';
import { ProductopruebaComponent } from './componets/productoprueba/productoprueba.component';
import { ProductDetailsComponent } from './componets/product-details/product-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: IndexComponent},
  {path: 'contactos', component: ContactsComponent},
  {path: 'productos', component:PodructosComponent},
  {path: 'productos/:cate', component:PodructosComponent},
  {path: 'detalles/:cate/:id',component:ProductDetailsComponent},
  {path: 'login',component: LoginComponent},
  {path: 'crear', component: CrearproductoComponent,canActivate:[AuthGuard]},
  {path: '**', component: ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
