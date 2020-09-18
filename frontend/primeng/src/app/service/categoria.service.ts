import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  baseUrl = 'http://localhost:3000/categorias/';

  constructor(private http: HttpClient) { }
  getAll(): Observable<any> {
    return this.http.get(this.baseUrl);
  }
}
