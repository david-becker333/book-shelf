import { Injectable } from '@angular/core';
import { Effect, ofType, Actions, createEffect } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { switchMap, map, catchError, delay, exhaustMap } from 'rxjs/operators';

import * as fromBooks from '../actions/book.actions';
import { BookService } from 'src/app/core/services/book.service';
import { IBook } from 'src/app/shared/model/book.model';
import { sortByAuthor, sortByNoOfPages, sortByReleaseDate } from '../../shared/utils';
import { Action } from '@ngrx/store';


@Injectable({providedIn: 'root'})
export class BookEffects {

  @Effect()
  getBooks$: Observable<Action> =  this.actions$.pipe(
    ofType(fromBooks.getBooks),
    exhaustMap((action) => {
      return this.bookService.query(action.query).pipe(
        // delay(500),
        map((books: IBook[]) => {

          /* let's simulate the sort order and limit which would typically be done by endpoint */
          const { sort, limit } = action.query;

          switch (sort) {
            case 'author': books.sort(sortByAuthor); break;
            case 'pages': books.sort(sortByNoOfPages); break;
            case 'releaseDate': books.sort(sortByReleaseDate); break;
            default: books.sort(sortByAuthor)
          }
          books = books.slice(0, limit);
          return fromBooks.getBooksSuccess(books);
        }),
        catchError(error => of(fromBooks.getBooksFailed(error)))
      );
    })
  );


  @Effect()
  getBook$: Observable<Action> = this.actions$.pipe(
    ofType(fromBooks.getBook),
    switchMap((action) => {
      return this.bookService.get(action.id).pipe(
        // delay(500),
        map(book => {
           return fromBooks.getBookSuccess(book);
        }),
        catchError(error => of(fromBooks.getBooksFailed(error)))
      );
    })
  );

  // @Effect()
  // getBooks$ = createEffect(() => ({
  //   // debounce = 300,
  //   // scheduler = asyncScheduler
  // } = {}) => this.actions.pipe(
  //   ofType(fromBooks.getBooks),
  //   switchMap((action) => {
  //     return this.bookService.query(action.query).pipe(
  //       // delay(500),
  //       map((books: IBook[]) => {

  //         /* let's simulate the sort order and limit which would typically be done by endpoint */
  //         const { sort, limit } = action.query;

  //         switch (sort) {
  //           case 'author': books.sort(sortByAuthor); break;
  //           case 'pages': books.sort(sortByNoOfPages); break;
  //           case 'releaseDate': books.sort(sortByReleaseDate); break;
  //           default: books.sort(sortByAuthor)
  //         }
  //         books = books.slice(0, limit);
  //         return fromBooks.getBooksSuccess(books);
  //       }),
  //       catchError(error => of(fromBooks.getBooksFailed(error)))
  //     );
  //   })
  //  )
  // );

  constructor(
    private bookService: BookService,
    private actions$: Actions) { }
}
