import { createAction } from '@ngrx/store';
import { IBook } from 'src/app/shared/model/book.model';

export const getBooks = createAction(
  '[BookShelf] getBooks',
  (query: any) => ({query})
)

export const getBooksSuccess = createAction(
  '[BookShelf] getBooksSuccess',
  (books: IBook[]) => ({books})
)

export const getBooksFailed = createAction(
  '[BookShelf] getBooksFailed',
  (error: any) => ({error})
)

export const getBook = createAction(
  '[BookShelf] getBook',
  (id: number) => ({id})
)

export const getBookSuccess = createAction(
  '[BookShelf] getBookSuccess',
  (book: IBook) => ({book})
)

export const getBookFailed = createAction(
  '[BookShelf] getBookFailed',
  (error: any) => ({error})
)
