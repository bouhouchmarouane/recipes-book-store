import {User} from '../user.model';
import {LOGIN, LOGOUT} from './auth.actions';

export interface State {
  user: User | null;
}

const initialState: State = {
  user: null
};

export function authReducer(state: State = initialState, action: any): State {
  switch (action.type) {
    case LOGIN:
      const tempUser = action.payload;
      const user = new User(tempUser.email, tempUser.id, tempUser.token, tempUser.expirationDate);
      return {
        ...state,
        user
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}
