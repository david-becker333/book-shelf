


export interface IAppState {
  login: boolean;
}

export const INITIAL_STATE: IAppState = {
  login: false
};

export const initialAppState: IAppState = {
  ...INITIAL_STATE
};

