import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe:Heroe = {
    nombre:"",
    casa:"Marvel",
    bio:""
  }

  nuevo:boolean = false;
  id:string;

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
              private _heroesService:HeroesService) {
                this.activatedRoute.params
                .subscribe(parametros=>{
                  this.id = parametros['id']
                  if(this.id != "nuevo"){
                    this._heroesService.obtenerHeroe(this.id)
                      .subscribe(data=>this.heroe = data);
                  }
                })
              }

  ngOnInit() {
  }

  guardar(){
    // console.log(this.heroe);
    if(this.id == "nuevo"){
      this._heroesService.nuevoHeroe(this.heroe)
          .subscribe(data=>{
            this.router.navigate(['/heroe',data.name]);
          },
            error=>console.error(error));
    }else{
      this._heroesService.actualizarHeroe(this.heroe, this.id)
          .subscribe(data=>{
            console.log(data);
          },
            error=>console.error(error));
    }
  }

  agregarNuevo(forma:NgForm){
    this.router.navigate(['/heroe','nuevo']);
    forma.reset({
      casa:"Marvel"
    });
  }

}
