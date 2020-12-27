import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from '@core/Book';
import { Observable } from 'rxjs';
import { BookDataService } from 'src/app/core/books/book-data.service';

@Component({
  selector: 'dp-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

  books: Observable<any>;
  dataSource = new MatTableDataSource<Book>();
  loading = true;
  subscription = [];
  disCols = ['img', 'title', 'author', 'category', 'price', 'addToCart'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private bookDataService: BookDataService) { }
  ngOnDestroy(): void {
    this.subscription.forEach(b => b.unsubscribe());
  }

  ngOnInit(): void {
    this.subscription.push(this.bookDataService.getAllBooks().subscribe(books => this.whenDataLoaded(books)));
  }

  whenDataLoaded(books: Book[]) {
    this.loading = false;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = books;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
