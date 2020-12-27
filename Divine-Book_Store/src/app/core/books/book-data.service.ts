import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '@core/Book';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
}) 
export class BookDataService {

  constructor(private $http: HttpClient) { }

  getAllBooks(): Observable<Book[]>{
    return this.$http.get("books.json").pipe(delay(1250)) as Observable<Book[]>;
  }
}
