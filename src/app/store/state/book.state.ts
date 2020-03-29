import { IBook } from 'src/app/shared/model/book.model';
import { Store, createSelector, createFeatureSelector } from '@ngrx/store';
import { IState, IActivity } from '.';

export interface IBookShelfState extends IActivity {
  books?: IBook[],
  selectedBook?: IBook
}
const INITIAL_STATE = {
  books: [],
  selectedBook: null
};

export const initialBookShelfState: IBookShelfState = {
  ...INITIAL_STATE
};


/* selectors */
export const selectFeature = (state: IState) => state.bookShelf;

export const selectBooks = createSelector(
    selectFeature,
    (state: IBookShelfState) => state.books
);

export const selectCurrentBook = createSelector(
  selectFeature,
  (state: IBookShelfState) => state.selectedBook
);

export const isBookShelfLoading = createSelector(
  selectFeature,
  (state: IBookShelfState) => state.loading
);

export const isBookShelfLoaded = createSelector(
  selectFeature,
  (state: IBookShelfState) => state.loaded
);
