import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Login } from '../componets/login/login.component';
import firebase from 'firebase/app';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user:Observable<any>;

  constructor(private auth: AngularFireAuth) { 
    this.user = this.auth.authState;
  }


 public aceptarCookies(){
    localStorage.setItem('aceptar','si');
  }

  public recuperarAceptacion(): boolean{
    const guardar = localStorage.getItem('aceptar');
    if(guardar === 'si'){
      return true;
    }
    return false;
  }


  public IniciarSession(correo: Login){
    const {email,password} = correo;
  return  this.auth.signInWithEmailAndPassword(email,password);
  }


  logout(){
    this.auth.signOut();
  }

  getAuth(){
   return this.user.pipe(take(1))
   .pipe(map(authState => !!authState))
   .subscribe(res => {
     
   });
  }
}
