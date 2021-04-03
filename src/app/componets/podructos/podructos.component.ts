import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { CategoryI } from 'src/app/models/categorias';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductsI } from '../../models/product-model';
import { MetasvcService } from '../../services/metasvc.service';
import { AuthService } from '../../services/auth.service';
import { map, take } from 'rxjs/operators';


export interface Serach{
  buscar: string;
}

export interface Filtrador{
  minimo: number,
  maximo: number
}

@Component({
  selector: 'app-podructos',
  templateUrl: './podructos.component.html',
  styleUrls: ['./podructos.component.css']
})
export class PodructosComponent implements OnInit {
 

  temp:ProductsI[] = [];
  productos: ProductsI[] = [];
  categorys: CategoryI[] = [];

  search = new FormGroup({buscar: new FormControl('',[Validators.required,Validators.minLength(2),Validators.maxLength(30)
  ])});

  filtro = new FormGroup({minimo: new FormControl('',[Validators.required,Validators.min(1)]),
                          maximo: new FormControl('',[Validators.required,Validators.min(1)])});

  pageActual: number = 1;
  totalItems: number =0;

  loading: boolean = true;

  buscarPor: string = '';

  cate: any;
  
  isAuth: boolean = false;

  constructor(private prodSVC: ProductosService,
    private route: Router,
    private router: ActivatedRoute,
    private title: Title,
    private seo: MetasvcService,
    private authSVC: AuthService) {
      this.buscarPor = 'Todo';
      this.title.setTitle('Productos')
     }

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

  //  this.getProduct(this.buscarPor);
  this.cate = this.router.snapshot.paramMap.get('cate');

  if(this.cate !== null){
    this.getProduct(this.cate);
  }else{
    this.getAllProduct();
  }
   this.getCategorys();
   this.seo.generateTags({
     title: 'Listado de Productos',
     description: 'Lista de productos para hombre, mujer, niño y niñas',
     slug:'productos'
   });

    
  }

  getAllProduct(){
 
    this.prodSVC.getAllProducts().subscribe(res => {
      this.productos = [];
      this.temp = [];
      res.forEach(val => {
        this.productos.push(val as ProductsI);
        this.temp.push(val as ProductsI);
      });
      this.totalItems = this.productos.length;
      this.loading = false;
    })
  }


  getProduct(ref: any): void{
    this.buscarPor = ref;
    this.route.navigate(['/productos',ref]);
    this.prodSVC.productos(ref).subscribe(res=>{
      this.productos = [];
      this.temp = [];
      res.forEach(val =>{
        this.productos.push(val as ProductsI);
        this.temp.push(val as ProductsI);
      });
      this.totalItems = this.productos.length;
      this.loading = false;
    },
    error =>{
      console.log(error);
      this.loading = false;
    }
    );
  }

  getCategorys():void{
    this.prodSVC.getCategorys().subscribe(res =>{
      res.forEach(cate =>{
        this.categorys.push(cate as CategoryI);  
      });
    },error=>{console.log(error);});
  }

  productDetail(id: any, cate: any): void{
    this.route.navigate(['/detalles', cate, id]);
  }

  buscar(form: Serach): void{
   this.productos = [];
   this.temp = [];
  
   this.buscarPor = form.buscar;
   this.prodSVC.searchProduc(form.buscar.toLocaleLowerCase()).valueChanges().subscribe(res => {
    res.forEach(val =>{
      this.productos.push(val as ProductsI);
      this.temp.push(val as ProductsI);
    });
    this.totalItems = this.productos.length;
    this.loading = false;
    if(this.totalItems >=1 && this.totalItems < 9  ){
      this.pageActual = 1;
    }
   }, error => {
    console.log(error);
    
   });
  }

  filtrarPrecio(valor: Filtrador): void{
    
    if(this.productos.length>0){
      let resultado = this.temp.filter((e:any) => {
        try{
          if(e.price>= valor.minimo&& e.price <=valor.maximo){
            return e;
          }
          
        }catch(a){

        }
      });
      this.productos =[];
      resultado.forEach(value=>{
        this.productos.push(value as ProductsI);
      });
      this.totalItems = this.productos.length;
      console.log(this.totalItems);
      
      if(this.totalItems >1 && this.totalItems < 9  ){
        this.pageActual = 1;
      }else if(this.totalItems === 0){
        this.pageActual = 1
        this.productos.push(...this.temp);
      }

    }
  }


  editProduct(prod:ProductsI):void{
    this.prodSVC.producto = prod;
    this.route.navigate(['/crear']);
  }

  deleteProduct(prod: ProductsI):void{
  
    
    
      this.prodSVC.deleteProduct(prod.id).then((res)=>{
        prod.url?.forEach(url => {
          this.prodSVC.deleteImg(url);
        })
        if(this.cate !== null){
          this.getProduct(this.cate);
        }else{
          this.getAllProduct();
        }
      })
      .catch(err=>console.log(err));
    
  }
}
