import * as fromApp from '../actions/app.actions';
import { createReducer, on } from '@ngrx/store';
import { produceOn } from '../immer';
import { initialAppState, IAppState } from '../state/app.state';

export const reducer = createReducer(
  initialAppState,
  // example app reducer for app wide state like login and config
  produceOn(fromApp.login, (draft, { credentials }) => {
    // TODO
  })
);

