import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {LoginStart, SignupStart} from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoggedIn = true;
  isLoading = false;
  error: string | null = null;
  private storeSub: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
    });
  }

  switchMode(): void {
    this.isLoggedIn = !this.isLoggedIn;
  }

  submit(form: NgForm): void {
    if (!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoggedIn) {
      this.store.dispatch(new LoginStart({email, password}));
    }
    else {
      this.store.dispatch(new SignupStart({email, password}));
    }
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
