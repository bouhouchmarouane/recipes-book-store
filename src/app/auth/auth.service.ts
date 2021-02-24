import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {Login, Logout} from './store/auth.actions';

export interface AuthResponseData {
  idToken:	string;
  email:	string;
  refreshToken: string;
  expiresIn: string	;
  localId: string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private key = environment.firebaseAPIKey;
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  // user = new BehaviorSubject<User | null>(null);
  autoLogoutTimer: any;

  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) { }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.url + ':signUp?key=' + this.key,
      {
        email,
        password,
        returnSecureToken: true
      }).pipe(catchError(this.handleError), tap(responseData => this.handleAuthentication(responseData)));
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.url + ':signInWithPassword?key=' + this.key, {
      email,
      password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(responseData => this.handleAuthentication(responseData)));
  }

  private handleAuthentication(data: AuthResponseData): void {
    const expirationDate = new Date(new Date().getTime() + +data.expiresIn * 1000);
    const user = new User(data.email, data.localId, data.idToken, expirationDate);
    // this.user.next(user);
    this.store.dispatch(new Login({
      email: data.email,
      id: data.localId,
      token: data.idToken,
      expirationDate}));
    this.autoLogout(+data.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<never>{
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
    return throwError(errorMessage);
  }

  autoLogin(): void {
    let userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    };
    let loadedUser;

    if (!localStorage.getItem('userData')) {
      return;
    }
    else {
      userData = JSON.parse(localStorage.getItem('userData') as string);
      loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    }

    if (loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(new Login({
        email: userData.email,
        id: userData.id,
        token: userData._token,
        expirationDate: new Date(userData._tokenExpirationDate)}));
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout(): void{
    // this.user.next(null);
    this.store.dispatch(new Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
  }

  autoLogout(expirationDuration: number): void {
    this.autoLogoutTimer = setTimeout(() => this.logout(), expirationDuration);
  }
}
