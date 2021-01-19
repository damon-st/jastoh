import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }


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
}
