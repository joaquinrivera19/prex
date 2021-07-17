import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.page.html',
  styleUrls: ['./detalle-pelicula.page.scss'],
})
export class DetallePeliculaPage implements OnInit {

  public pel: any[] = [];

  constructor(private activatedRoute: ActivatedRoute,private storage: Storage) { }

  async ngOnInit() {

    await this.storage.create();

    const id = await this.activatedRoute.snapshot.paramMap.get('id');

    const result = await this.storage.get('peliculas');

    const found = await result.find(element => element.id == id);

    if(found){
      this.pel = found;
    } 

  }

}
