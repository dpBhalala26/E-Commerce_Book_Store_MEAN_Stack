import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books/books.component';
import { HttpClientModule } from '@angular/common/http';
import { DpNgMaterialModule } from '../shared/ng-material-module';
import { BookDataService } from '../core/books/book-data.service';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    HttpClientModule,
    DpNgMaterialModule,
    SharedModule
  ],
  providers: [BookDataService]
})
export class BooksModule { }
