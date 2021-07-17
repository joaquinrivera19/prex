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

  constructor(
    private moviesService: MoviesService,
    public navCtrl: NavController,
    private storage: Storage
  ) {}

  async ngOnInit() {

    await this.storage.create();

    const result: any = await this.moviesService.getPopulares();

    this.listado_peliculas.push(...result.results);

    this.storage.set('peliculas',this.listado_peliculas)

    console.log(this.listado_peliculas);
  }

  ver_pelicula(id: any) {
    this.navCtrl.navigateForward(['/detalle-pelicula/', id]);
  }
}
