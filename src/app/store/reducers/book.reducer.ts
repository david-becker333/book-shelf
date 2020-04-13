import * as fromBooks from '../actions/book.actions';
import { initialBookShelfState, IBookShelfState } from '../state/book.state';
import { createReducer } from '@ngrx/store';
import { produceOn } from '../immer';
import { startLoading, doneLoading, failedLoading } from '../transitions';

export const reducer = createReducer(
  initialBookShelfState,
  produceOn(fromBooks.getBooks, (draft: IBookShelfState) => {
    draft.error = null;
    startLoading(draft);
  }),
  produceOn(fromBooks.getBooksSuccess, (draft: IBookShelfState, { books }) => {
    draft.books = books;
    doneLoading(draft);
  }),
  produceOn(fromBooks.getBooksFailed, (draft: IBookShelfState, {error}) => {
    draft.books = [];
    draft.error = error;
    failedLoading(draft);
  }),
  produceOn(fromBooks.getBook, (draft: IBookShelfState) => {
    draft.error = null;
    startLoading(draft);
  }),
  produceOn(fromBooks.getBookSuccess, (draft: IBookShelfState, { book }) => {
    draft.selectedBook = book;
    draft.error = null;
    doneLoading(draft);
  }),
  produceOn(fromBooks.getBookFailed, (draft: IBookShelfState, { error }) => {
    draft.selectedBook = null;
    draft.error = error;
    failedLoading(draft);
  })
);

