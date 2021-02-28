import {Actions, Effect, ofType} from '@ngrx/effects';
import {AUTO_LOGIN, Login, LOGIN_START, LOGIN_SUCCESS, LoginFail, LoginStart, LOGOUT, SIGNUP_START, SignupStart} from './auth.actions';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../user.model';

export interface AuthResponseData {
  idToken:	string;
  email:	string;
  refreshToken: string;
  expiresIn: string	;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  private key = environment.firebaseAPIKey;
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(LOGIN_START),
    switchMap((authData: LoginStart) => {
      return this.http.post<AuthResponseData>(this.url + ':signInWithPassword?key=' + this.key, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(map((resposeData: AuthResponseData) => {
        return handleAuthentication(resposeData);
      }), catchError((errorResponse: HttpErrorResponse) => {
        return handleError(errorResponse);
      }));
    })
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(LOGIN_SUCCESS),
    tap(() => this.router.navigate(['/']))
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(SIGNUP_START),
    switchMap((signupAction: SignupStart) => {
      return this.http.post<AuthResponseData>(this.url + ':signUp?key=' + this.key,{
        email: signupAction.payload.email,
        password: signupAction.payload.password,
        returnSecureToken: true
      }).pipe(map((resposeData: AuthResponseData) => {
        return handleAuthentication(resposeData);
      }), catchError((errorResponse: HttpErrorResponse) => {
        return handleError(errorResponse);
      }));
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AUTO_LOGIN),
    map(() => {
      let userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      };
      let loadedUser;

      if (!localStorage.getItem('userData')) {
        return {type: 'DUMMY'};
      }
      else {
        userData = JSON.parse(localStorage.getItem('userData') as string);
        loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      }

      if (loadedUser.token) {
        // this.user.next(loadedUser);
        return new Login({
          email: userData.email,
          id: userData.id,
          token: userData._token,
          expirationDate: new Date(userData._tokenExpirationDate)});
        // const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        // this.autoLogout(expirationDuration);
      }
      return {type: 'DUMMY'};
    })
  );
  constructor(private actions$: Actions, private http: HttpClient, private router: Router) {}
}

const handleAuthentication = (resposeData: AuthResponseData) => {
  const expirationDate = new Date(new Date().getTime() + +resposeData.expiresIn * 1000);
  const user = new User(resposeData.email, resposeData.localId, resposeData.idToken, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new Login({
    email: resposeData.email,
    id: resposeData.localId,
    token: resposeData.idToken,
    expirationDate
  });
};
const handleError = (errorResponse: HttpErrorResponse) => {
  let errorMessage = 'An error occurred';
  if (errorResponse.error && errorResponse.error.error) {
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password';
        break;
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator';
        break;
    }
  }
  return of(new LoginFail(errorMessage));
};
