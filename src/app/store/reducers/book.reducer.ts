import * as fromBooks from '../actions/book.actions';
import { initialBookShelfState, IBookShelfState } from '../state/book.state';
import { createReducer } from '@ngrx/store';
import { produceOn } from '../immer';
import { startLoading, doneLoading, failedLoading } from '../transitions';

export const reducer = createReducer(
  initialBookShelfState,
  produceOn(fromBooks.getBooks, (draft: IBookShelfState) => {
    startLoading(draft);
  }),
  produceOn(fromBooks.getBooksSuccess, (draft: IBookShelfState, { books }) => {
    draft.books = books;
    doneLoading(draft);
  }),
  produceOn(fromBooks.getBooksFailed, (draft: IBookShelfState) => {
    draft.books = [];
    failedLoading(draft);
  }),
  produceOn(fromBooks.getBook, (draft: IBookShelfState) => {
    startLoading(draft);
  }),
  produceOn(fromBooks.getBookSuccess, (draft: IBookShelfState, { book }) => {
    draft.selectedBook = book;
    doneLoading(draft);
  }),
  produceOn(fromBooks.getBookFailed, (draft: IBookShelfState) => {
    draft.selectedBook = null;
    failedLoading(draft);
  })
  // on(fromBooks.getBook, (state: IBookShelfState, { book }) => ({
  //    ...state, 
  //    selectedBook: book 
  // })),
);

