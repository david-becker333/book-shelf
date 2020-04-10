
import { IAppState } from '../state/app.state';
import { IBookShelfState } from './book.state';

export interface IState {
  app?: IAppState; // used for application state
  bookShelf?: IBookShelfState  // used for the book shelf state
}

export interface IActivity {
  loading?: boolean;
  loaded?: boolean;
  processing?: boolean;
  processed?: boolean;
  message?: string;
  error?: any;
}

