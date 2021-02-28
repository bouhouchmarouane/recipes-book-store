import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {Logout} from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  autoLogoutTimer: any;

  constructor(private store: Store<AppState>) { }

  setLogoutTimer(expirationDuration: number): void {
    this.autoLogoutTimer = setTimeout(() => this.store.dispatch(new Logout()), expirationDuration);
  }

  clearLogoutTimer(): void {
    if (this.autoLogoutTimer) {
      clearTimeout(this.autoLogoutTimer);
    }
  }
}
