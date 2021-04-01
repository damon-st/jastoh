import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { BlogI } from '../../models/blog';
import { ProductosService } from '../../services/productos.service';
import { CategoryI } from '../../models/categorias';

declare var $:any;

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blog: BlogI[] = [];
  categorys:CategoryI[] = [];
  blogsRelacionados: BlogI[] = [];

  urlsImg: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productSVC:ProductosService
              ) {

               }

  ngOnInit(): void {


    const id = this.route.snapshot.paramMap.get('id');
   
    this.getBlogDetails(id);

    this.productSVC.getBlogsCategorys().subscribe(res =>{
      res.forEach(v =>{
        this.categorys.push(v as CategoryI);
      });
    });

    this.router.events.subscribe((events) =>{
        if(events instanceof NavigationStart){

        }
        if(events instanceof NavigationEnd){
          window.scrollTo({top: 0,behavior: 'smooth'});
          const id  = this.route.snapshot.paramMap.get('id');
          this.getBlogDetails(id);
        }
    })
  }

  getBlogDetails(id: any){
    this.productSVC.getBlogDetails(id).subscribe(res => {
      this.blog = [];
      res.forEach(value => {
        this.blog.push(value as BlogI);
      });
      
      if(this.blog.length>0){
        this.productSVC.getBlogsQueryCategories(this.blog[0].category).subscribe(res =>{
          this.blogsRelacionados =[];
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
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    window.onpopstate = (e:any) =>{
      $('#imgModal').modal('hide');
    }
  }

  updateUrlImgShow(url:any):void{
    this.urlsImg = url;
  }

  showProductRela(id:any){
    this.router.navigate(['/blog/detalles',id]);
  }

}
