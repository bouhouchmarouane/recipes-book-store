import {User} from '../user.model';
import {CLEAR_ERROR, LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS, LOGOUT, SIGNUP_START} from './auth.actions';

export interface State {
  user: User | null;
  authError: string | null;
  loading: boolean
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
};

export function authReducer(state: State = initialState, action: any): State {
  switch (action.type) {
    case LOGIN_SUCCESS:
      const tempUser = action.payload;
      const user = new User(tempUser.email, tempUser.id, tempUser.token, tempUser.expirationDate);
      return {
        ...state,
        user,
        authError: null,
        loading: false
      };
    case LOGOUT:
      return {
        ...state,
        user: null
      };
    case LOGIN_START:
    case SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true
      }
    case LOGIN_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    case CLEAR_ERROR:
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
}
