import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Subcategoria} from 'src/model/subcategoria';
@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line:member-ordering
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };


  baseUrl = 'http://localhost:3000/subcategorias/';
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

  // getAllSubcategory(COD_CATEGORIA: string): Observable<any> {
  //   return this.http.get(`${this.baseUrl} + ${COD_CATEGORIA}`);
  // }
  getAllSubcategory(COD_CATEGORIA: string): Observable<any> {
    return this.http.get(this.baseUrl + "'" + COD_CATEGORIA + "'");
  }
  Insert(subcategoria: Subcategoria): Observable<Subcategoria> {
    return this.http.post<Subcategoria>(this.baseUrl, subcategoria)
    .pipe(
      catchError(this.handleError)
    );
  }
  delete(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }
}
