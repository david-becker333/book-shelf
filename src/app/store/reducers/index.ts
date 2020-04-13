import { ActionReducerMap, MetaReducer, ActionReducer } from '@ngrx/store';
import { IState } from '../state';
import { reducer as appReducer } from '../reducers/app.reducer';
import { reducer as bookShelfReducer } from '../reducers/book.reducer';
import { environment } from '../../../environments/environment';

export const rootReducers: ActionReducerMap<IState> = {
  app: appReducer,
  bookShelf: bookShelfReducer
};

// console.log all actions
export const debug = (reducer: ActionReducer<any>): ActionReducer<any> => {
  return function(state, action) {
    console.log('state', state);
    console.log('action', action);
 
    return reducer(state, action);
  };
}

// optional meta reducer for store
export const metaReducers: MetaReducer<IState>[] = !environment.production ? [] : [];
