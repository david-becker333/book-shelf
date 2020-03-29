import { createAction } from '@ngrx/store';
import { Credentials } from '../../shared/model/app.model';

export const login = createAction(
  '[App] login',
  (credentials: Credentials) => ({credentials}),
)

export const loginSuccess = createAction(
  '[App] loginSuccess',
  (loggedIn: boolean) => ({loggedIn})
)

export const loginFailed = createAction(
  '[App] loginFailed',
  (error: any) => ({error})
)
