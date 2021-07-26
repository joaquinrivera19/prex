import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { element } from 'protractor';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.page.html',
  styleUrls: ['./detalle-pelicula.page.scss'],
})
export class DetallePeliculaPage implements OnInit {
  pel: any[] = [];
  mostrar_editar = false;
  id: string;
  result: any[] = [];
  productos_filtrados: any[] = [];
  overview: string;
  valor_rate1:boolean;
  valor_rate2:boolean;
  valor_rate3:boolean;
  valor_rate4:boolean;
  valor_rate5:boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();

    this.id = await this.activatedRoute.snapshot.paramMap.get('id');

    this.result = await this.storage.get('peliculas');

    this.pel = await this.result.find((element) => element.id == this.id);

    if(this.pel['rate1'] == true){
      this.valor_rate1 = true;
    }

    if(this.pel['rate2'] == true){
      this.valor_rate2 = true;
    }

    if(this.pel['rate3'] == true){
      this.valor_rate3 = true;
    }

    if(this.pel['rate4'] == true){
      this.valor_rate4 = true;
    }

    if(this.pel['rate5'] == true){
      this.valor_rate5 = true;
    }
  }

  edit() {
    console.log(this.id);

    this.mostrar_editar = true;
  }


  async guardar() {
    this.mostrar_editar = false;
    this.productos_filtrados = [];

    const result2 = await this.storage.get('peliculas');

    for (const prod of result2) {
      if (prod.id == this.id) {
        prod['overview']= this.overview;
      }

      this.productos_filtrados.unshift(prod);
      
    }

    await this.storage.set('peliculas', this.productos_filtrados);

    this.ngOnInit();

  }

  async rate(valor){

    if (valor == 1){

      this.valor_rate1 = true;
      this.valor_rate2 = false;
      this.valor_rate3 = false;
      this.valor_rate4 = false;
      this.valor_rate5 = false;

    } else if (valor == 2){

      this.valor_rate1 = true;
      this.valor_rate2 = true;
      this.valor_rate3 = false;
      this.valor_rate4 = false;
      this.valor_rate5 = false;

    } else if (valor == 3){

      this.valor_rate1 = true;
      this.valor_rate2 = true;
      this.valor_rate3 = true;
      this.valor_rate4 = false;
      this.valor_rate5 = false;

    } else if (valor == 4){

      this.valor_rate1 = true;
      this.valor_rate2 = true;
      this.valor_rate3 = true;
      this.valor_rate4 = true;
      this.valor_rate5 = false;

    } else if (valor == 5){

      this.valor_rate1 = true;
      this.valor_rate2 = true;
      this.valor_rate3 = true;
      this.valor_rate4 = true;
      this.valor_rate5 = true;

    }


    this.productos_filtrados = [];

    const result3 = await this.storage.get('peliculas');

    for (const prod of result3) {
      if (prod.id == this.id) {
        prod['rate1']= this.valor_rate1;
        prod['rate2']= this.valor_rate2;
        prod['rate3']= this.valor_rate3;
        prod['rate4']= this.valor_rate4;
        prod['rate5']= this.valor_rate5;
      }

      console.log(prod)
      this.productos_filtrados.unshift(prod);
      
    }
    await this.storage.set('peliculas', this.productos_filtrados);

  }
}
