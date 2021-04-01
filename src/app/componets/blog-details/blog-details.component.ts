import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogI } from '../../models/blog';
import { ProductosService } from '../../services/productos.service';
import { CategoryI } from '../../models/categorias';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blog: BlogI[] = [];
  categorys:CategoryI[] = [];
  blogsRelacionados: BlogI[] = [];

  constructor(private route: ActivatedRoute,
              private productSVC:ProductosService) {

               }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productSVC.getBlogDetails(id).subscribe(res => {
      res.forEach(value => {
        this.blog.push(value as BlogI);
      });
      
      if(this.blog.length>0){
        this.productSVC.getBlogsQueryCategories(this.blog[0].category).subscribe(res =>{
          res.forEach(vl =>{
            this.blogsRelacionados.push(vl as BlogI);
          })
        },error => {
  
        });
      }
      
    },
    error =>{
      console.log(error);
    });

    this.productSVC.getBlogsCategorys().subscribe(res =>{
      res.forEach(v =>{
        this.categorys.push(v as CategoryI);
      });
    });
  }

}
