import { Component, OnInit } from '@angular/core';
import {FormGroup, NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogedIn = true;
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isLogedIn = true;
  }

  swithMode(): void {
    this.isLogedIn = !this.isLogedIn;
  }

  submit(form: NgForm): void {
    if (!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObservable: Observable<AuthResponseData>;

    authObservable = this.isLogedIn ? this.authService.login(email, password) : this.authService.signup(email, password);

    this.isLoading = true;
    authObservable.subscribe(response => {
      console.log(response);
      this.isLoading = false;
    }, errorMessage => {
      this.error = errorMessage;
      console.log(errorMessage);
      this.isLoading = false;
    });
    form.reset();
  }
}
