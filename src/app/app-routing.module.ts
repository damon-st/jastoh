import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactsComponent } from './componets/contacts/contacts.component';
import { DetailsComponent } from './componets/details/details.component';
import { ErrorpageComponent } from './componets/errorpage/errorpage.component';
import { IndexComponent } from './componets/index/index.component';
import { PodructosComponent } from './componets/podructos/podructos.component';

const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'inicio', component: IndexComponent},
  {path: 'contactos', component: ContactsComponent},
  {path: 'productos', component:PodructosComponent},
  {path: 'detalles/:cate/:id',component:DetailsComponent},
  {path: '**', component: ErrorpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
