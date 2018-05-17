import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Heroe } from '../interfaces/heroe.interface';
import 'rxjs/Rx';

@Injectable()
export class HeroesService {

  fireHeroesUrl:string = "https://heroesapp-9db99.firebaseio.com/heroes.json";
  fireHeroeUrl:string = "https://heroesapp-9db99.firebaseio.com/heroes/";

  constructor(private http:Http) {}

  nuevoHeroe(heroe:Heroe){
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-type':'application/json'
    });
    return this.http.post(this.fireHeroesUrl, body, {headers:headers})
      .map(res=>{
        // console.log(res.json());
        return res.json();
      })
  }

  actualizarHeroe(heroe:Heroe, key$:string){
    let body = JSON.stringify(heroe);
    let headers = new Headers({
      'Content-type':'application/json'
    });
    let url = `${this.fireHeroeUrl}/${key$}.json`;
    return this.http.put(url, body, {headers:headers})
      .map(res=>{
        // console.log(res.json());
        return res.json();
      })
  }

  obtenerHeroe(key$:string){
    let headers = new Headers({
      'Content-type':'application/json'
    });
    let url = `${this.fireHeroeUrl}/${key$}.json`;
    return this.http.get(url, {headers:headers})
      .map(res=>{
        // console.log(res.json());
        return res.json();
      })
  }

  obtenerHeroes(){
    let headers = new Headers({
      'Content-type':'application/json'
    });
    return this.http.get(this.fireHeroesUrl, {headers:headers})
      .map(res=>{
        // console.log(res.json());
        return res.json();
      })
  }

  borrarHeroe(key$:string){
    let headers = new Headers({
      'Content-type':'application/json'
    });
    let url = `${this.fireHeroeUrl}/${key$}.json`;
    return this.http.delete(url, {headers:headers})
      .map(res=>{
        // console.log(res.json());
        return res.json();
      })
  }
}
