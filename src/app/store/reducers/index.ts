import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IState } from '../state';
import { reducer as appReducer } from '../reducers/app.reducer';
import { reducer as bookShelfReducer } from '../reducers/book.reducer';
import { environment } from '../../../environments/environment';

export const rootReducers: ActionReducerMap<IState> = {
  app: appReducer,
  bookShelf: bookShelfReducer
};

// optional meta reducer for store
export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];
