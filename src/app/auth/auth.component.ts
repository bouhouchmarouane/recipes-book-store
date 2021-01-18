import { Component, OnInit } from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoggedIn = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = true;
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
    let authObservable: Observable<AuthResponseData>;

    authObservable = this.isLoggedIn ? this.authService.login(email, password) : this.authService.signup(email, password);

    this.isLoading = true;
    authObservable.subscribe(response => {
      console.log(response);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
      console.log('navigate');
    }, errorMessage => {
      this.error = errorMessage;
      console.log(errorMessage);
      this.isLoading = false;
    });
    form.reset();
  }
}
