import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { BlogI } from '../../models/blog';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


  blogs: BlogI [] = [];
  isAuth:boolean = false;

  valueProgess:number = 0;
  isUpdated: boolean  = true;

  cargarBLogsValue = 0;

  msg:any;

  constructor(private router: Router,
    private productSVC: ProductosService,
    private authSVC: AuthService) { }

  ngOnInit(): void {

    this.authSVC.user.pipe(take(1))
    .pipe(map(authState=> !!authState))
    .subscribe(res =>{
      if(res){
        this.isAuth = true;
      }else{
        this.isAuth = false;
      }
    });
    this.getBlogs(9);
  }

  getBlogs(max:any):void{
    this.cargarBLogsValue += max;
    this.productSVC.getAllBlogs(this.cargarBLogsValue).subscribe(res => {
      this.valueProgess = 50;
      this.blogs = [];
      res.forEach(val => {
        this.blogs.push(val as BlogI);
      });
      this.valueProgess = 100;
      this.isUpdated = false;
    },
    error => {
      console.log("Error al cargar datos " + error);
      
    });
  }

  showDetails(id:any):void{
    this.router.navigate(['/blog/detalles',id]);
  }

  deleteBlogs(id:any,url:any){

    this.productSVC.deleteImg(url).subscribe(res=>{
      this.msg = "Exito al borrar la imagen"
      this.productSVC.deleteBlog(id).then((sus) =>{
        this.msg = "Exito en borrar el pots";

        setTimeout(() => {
          this.msg = '';
        },2000);
      }).catch((error)=>{
        console.log(error);
        
      });
    });
  }


  editBlog(blog:BlogI){
    this.productSVC.blog = blog;
    this.router.navigate(['/blog/crear']);
  }

}
