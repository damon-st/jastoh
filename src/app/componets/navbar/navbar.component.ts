import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

declare var $ : any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth:boolean = false;
  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.auth.user.pipe(take(1))
   .pipe(map(authState => !!authState))
   .subscribe(res => {
     if(res){
      this.isAuth = true;
     }else{
       this.isAuth = false;
     }
   });

    //Canvas Menu
      $(".canvas__open").on('click', function () {
        $(".offcanvas-menu-wrapper").addClass("active");
        $(".offcanvas-menu-overlay").addClass("active");
    });

    $(".offcanvas-menu-overlay, .offcanvas__close").on('click', function () {
        $(".offcanvas-menu-wrapper").removeClass("active");
        $(".offcanvas-menu-overlay").removeClass("active");
    });
  }



}
