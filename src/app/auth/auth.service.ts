import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user.model';
import {Router} from '@angular/router';

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
  private key = 'AIzaSyDgdKGWt6yvgTNomaXTKqtw54A8C9Kg6Ls';
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) { }

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
    this.user.next(user);
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

  logout(): void{
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
}
