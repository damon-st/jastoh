import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CategoryI } from 'src/app/models/categorias';
import { ImageUrlsI } from 'src/app/models/imageurl';
import { ProductsI } from 'src/app/models/product-model';
import { ProductosService } from 'src/app/services/productos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.component.html',
  styleUrls: ['./crearproducto.component.css']
})
export class CrearproductoComponent implements OnInit {

  datos:any;

  categorias: CategoryI[] = [];
  valorImagen = 0;
  imgRef: string[] = [];
  
  errores: any;
  exito:any;
  url: any;

  producto: ProductsI = {cantidad:0,
                        category: '',
                        description: '',
                        id: '',
                       imgPortada: '',
                       price: 0,
                      title: '',
                      marca: '',
                      url:[]};

  @ViewChild('imgFile')
  imgFile!: ElementRef;
  constructor(private productSVC: ProductosService,
    private storage: AngularFireStorage,
    private router: Router) { }

  ngOnInit(): void {
  
    this.producto = this.productSVC.producto;

    this.datos= new FormGroup({title: new FormControl(this.producto.title,[Validators.required,Validators.minLength(2)]),
    description:new FormControl(this.producto.description,[Validators.required,Validators.minLength(2)]),
    marca: new FormControl(this.producto.marca),
    id: new FormControl(this.producto.id),
    category: new FormControl(this.producto.category,Validators.required),
    price: new FormControl(this.producto.price,[Validators.required,Validators.minLength(1)]),
    cantidad: new FormControl(this.producto.cantidad,[Validators.required,Validators.minLength(1)])
    });

    this.producto.url?.forEach(url =>{
      this.imgRef.push(url as string);
    })

      this.productSVC.getCategorys().subscribe(res =>{
        res.forEach(cate =>{
          this.categorias.push(cate as CategoryI);
        });
      },error => console.log(error))
  }

  crear(producto: ProductsI){
    if(this.imgRef.length < 1){
      this.errores = 'Porfavor sube una imagen como minimo para el producto :(';
   }else if(producto.title ==='' || producto.description === '' ||
    producto.category ===''){
    this.errores = 'Porfavor rellena todos los campos';
   }else {

    if(producto.id !== undefined){
      producto.url = [];
      producto.url.push(...this.imgRef);
      producto.imgPortada = this.imgRef[0];
      this.productSVC.updateProduct(producto.id,producto).then(res =>{
         
        this.datos.reset();
        this.imgRef = [];
        this.exito = "Se a actualizado correctamente el producto";
        this.errores = "";
        this.valorImagen = 0;
        setTimeout(()=>{
          this.exito="";
        },5000);
      }).catch(error =>{
        console.log(error);
        this.errores = error;
      });

    }else{
      producto.url = [];
      producto.url.push(...this.imgRef);
      producto.imgPortada = this.imgRef[0];
      producto.title = producto.title?.toLocaleLowerCase();
      
      this.productSVC.createProduct(producto).then(res => {
      
        this.datos.reset();
        this.imgRef = [];
        this.exito = "Se a creado exitosamente el Producto puedes seguir creando mas productos";
        this.errores = "";
        this.valorImagen = 0;
        setTimeout(()=>{
          this.exito="";
        },5000);
      }).catch(error => {
        console.log(error);
        this.errores = error;
      });
    }

 
   }
    
  }

  getImages(event:any){
    const file = event.target.files;

    if(file !==null && file.length >0){
      
      for(let i =0; i< file.length ; i++){
        const files = file[i];
        const size = files.size;
        const name = files.name;
        
        if(size >= 400){
          this.valorImagen = 10;
          const id = name + Math.random().toString(36).substring(2);
          const filePath = `Products/${id}`;
          const ref = this.storage.ref(filePath);
          const task = this.storage.upload(filePath,files);
          
          task.snapshotChanges()
          .pipe(finalize(() => {
            ref.getDownloadURL().subscribe((url) =>{
                this.imgRef = this.imgRef.concat([url]);
                this.valorImagen = 100;
            })
          })).subscribe();

          setTimeout(() => {
            this.cambioValores();
          }, 1000);
        }
      }
    }
  }

  cambioValores(): void{
    this.valorImagen = 0;
    this.imgFile.nativeElement.value = '';
  }

  deleteImg(url : any, i: number): void{

    this.productSVC.deleteImg(url).subscribe(res => {
      this.imgRef.splice(i,1);
    },
    error => {
      console.log(error);
      this.errores = error;
    }); 
  }


  showImage(url: any){
    this.url = url;
  }
 
  

  
  isVideoOImage(valor: any) : string{
    
    if(valor.includes('.mp4')){
      return 'video';
    }
    return 'image';
    
  }
}
