import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const URL    = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {


  constructor(private http: HttpClient) { }


  async getPopulares(){
    return await this.http.get(`${URL}/movie?sort_by=popularity.desc&api_key=${ apiKey }&language=es&include_image_language=es&with_cast=3`).toPromise();
  }

}