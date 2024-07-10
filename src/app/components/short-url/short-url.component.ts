import { Component } from '@angular/core';
import { ShortUrlService } from 'src/app/services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent {

nombreURL:string;
urlShort:string;
urlProcesada:boolean;
loading:boolean;
mostrarError:boolean;
textError:string;


  constructor(private _shortUrlService:ShortUrlService){
      this.nombreURL='';
      this.urlShort='';
      this.urlProcesada=false;
      this.loading=false;
      this.mostrarError=false;
      this.textError='';
  }

  ngOnInit():void{

  }

  procesarUrl(){

    //validar si la url es vacia
    if (this.nombreURL===''){
      this.mostrarError=true;
      this.textError='Por favor ingrese una url';
      setTimeout(() => {
        this.mostrarError=false;
         this.urlProcesada=false;

      }, 3000);
      this.urlShort='';
      this.urlProcesada=false;

      return;
    }
    this.loading=true;

    setTimeout(() => {
      this.obtenerUrlShort()
    }, 2000);




  }
  obtenerUrlShort(){
      this.loading=false;
      this._shortUrlService.getUrlShort(this.nombreURL).subscribe(data=>{
      this.urlShort=data.link;
      this.urlProcesada=true;

    }, error=>{

      console.log(error.error.description);

      if (error.error.description==='The value provided is invalid.'){
        this.mostrarError=true;
        this.textError='Por favor ingrese una url válida';
        setTimeout(() => {
          this.mostrarError=false;
           this.urlProcesada=false;

        }, 3000);

        this.urlShort='';
        this.urlProcesada=false;
        this.loading=false;
        this.nombreURL='';

      }
    })

  }
}


