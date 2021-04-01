import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { CategoryI } from 'src/app/models/categorias';
import { ProductsI } from 'src/app/models/product-model';
import { ProductosService } from 'src/app/services/productos.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogI } from '../../models/blog';

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.component.html',
  styleUrls: ['./create-blog.component.css']
})
export class CreateBlogComponent implements OnInit {

  datos: any;

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
  
    if(this.productSVC.blog !== undefined){
      this.datos= new FormGroup({title: new FormControl(this.productSVC.blog.title,[Validators.required,Validators.minLength(2)]),
                        contenido:new FormControl(this.productSVC.blog.contenido,[Validators.required,Validators.minLength(2)]),
                        frases: new FormControl(this.productSVC.blog.frases),
                        category: new FormControl(this.productSVC.blog.category,Validators.required),
                        id: new FormControl(this.productSVC.blog.id),
                        fecha: new FormControl(this.productSVC.blog.fecha),
                        autor: new FormControl(this.productSVC.blog.autor,[Validators.required,Validators.minLength(1)])});    
    
        this.productSVC.blog.urlImgs?.forEach(res =>{
          
          this.imgRef.push(res as string);
        });
    }

      this.productSVC.getBlogsCategorys().subscribe(res =>{
        this.categorias = [];
        res.forEach(cate =>{
          this.categorias.push(cate as CategoryI);
        });
      },error => console.log(error))
  }

  crear(blog: BlogI){
    if(this.imgRef.length < 1){
      this.errores = 'Porfavor sube una imagen como minimo para el blog :(';
   }else if(blog.title ==='' || blog.contenido === '' ||
    blog.category ===''){
    this.errores = 'Porfavor rellena todos los campos';
   }else {
    
    if(blog.fecha === undefined || blog.fecha === null ){

      blog.fecha = this.getDate().toLocaleLowerCase();
    }
    blog.urlImgs = [];
    blog.urlImgs.push(...this.imgRef);
    blog.imgPortada = this.imgRef[0];
    blog.title = blog.title?.toLocaleLowerCase();
    if(blog.id && blog.id !== undefined){
 
      
      this.productSVC.updateBlog(blog.id,blog).then(res=>{
        this.datos.reset();
        this.imgRef = [];
        this.exito = "Se actualizado exitosamente el Blog";
        this.errores = "";
        this.valorImagen = 0;
        setTimeout(()=>{
          this.exito="";
        },5000);
      }).catch(error =>{
        this.errores = error;
      })
    }else{
    
      
      this.productSVC.createBlog(blog).then(res => {
    
        this.datos.reset();
        this.imgRef = [];
        this.exito = "Se a creado exitosamente el Blog";
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
          const filePath = `Blogs/${id}`;
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

  getDate(): string{
    const meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    const diasSemana = new Array("Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado");
    const dias = new Array('00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31');
    const  f=new Date();
    const ampm = (f.getHours() >=12) ? 'p.m.':'a.m.';
     return dias[f.getDate()] + " de " + meses[f.getMonth()] + " de " + f.getFullYear();
    
  }

}
