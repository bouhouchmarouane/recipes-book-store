import {Actions, Effect, ofType} from '@ngrx/effects';
import {Login, LOGIN_START, LoginStart} from './auth.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {of} from 'rxjs';
import {Injectable} from '@angular/core';

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
        const expirationDate = new Date(new Date().getTime() + +resposeData.expiresIn * 1000);
        return of(new Login({
          email: resposeData.email,
          id: resposeData.localId,
          token: resposeData.idToken,
          expirationDate
        }));
      }), catchError(error => {
        return of();
      }));
    })
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
