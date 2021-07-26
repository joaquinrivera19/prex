import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { NavController } from '@ionic/angular';

import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listado_peliculas: any[] = [];
  result: any[] = [];
  valor_rate1: boolean;
  valor_rate2: boolean;
  valor_rate3: boolean;
  valor_rate4: boolean;
  valor_rate5: boolean;

  constructor(
    private moviesService: MoviesService,
    public navCtrl: NavController,
    private storage: Storage
  ) {}

  async ngOnInit() {
    await this.storage.create();

    const result: any = await this.moviesService.getPopulares();
    this.listado_peliculas.push(...result.results);
    this.storage.set('peliculas', this.listado_peliculas);
  }

  async ionViewWillEnter() {
    this.listado_peliculas = await this.storage.get('peliculas');

    this.listado_peliculas.sort(function (a,b) {
      return a.id - b.id
    })
    
  }

  ver_pelicula(id: any) {
    this.navCtrl.navigateForward(['/detalle-pelicula/', id]);
  }
}
