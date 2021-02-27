import { Component, OnInit } from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {LoginStart, SignupStart} from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoggedIn = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
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
}
