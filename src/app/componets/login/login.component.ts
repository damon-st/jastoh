import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';


export interface Login{
  email:string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 
  errores: string = '';
  formta = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  correo = new FormGroup({email: new FormControl('',[Validators.email,Validators.required,Validators.minLength(6),Validators.maxLength(30),
                          Validators.pattern(this.formta)]),
                          password: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(30)])});

  constructor(private auth: AuthService,
              private router: Router ) { }

  ngOnInit(): void {
   this.auth.user.pipe(take(1))
   .pipe(map(authState => !!authState))
   .subscribe(res => {
     if(res){
       this.router.navigate(['/crear']);
     }
   });
   
  }


  
  login(  data: Login): void{
    this.auth.IniciarSession(data).then(res => {
      console.log(res);
      this.router.navigate(['/crear']);
      
    }).catch(error =>{
      console.log(error);
      this.errores = error.code;
    });
  }

}
