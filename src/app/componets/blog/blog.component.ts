import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogI } from '../../models/blog';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {


  blogs: BlogI [] = [];

  valueProgess:number = 0;
  isUpdated: boolean  = true;

  cargarBLogsValue = 0;

  constructor(private router: Router,
    private productSVC: ProductosService) { }

  ngOnInit(): void {

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

}
