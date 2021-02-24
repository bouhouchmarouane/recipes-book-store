import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  showSaveDataSpinner = false;
  showFetchDataSpinner = false;
  private authSubscription: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  saveData(): void {
    this.showSaveDataSpinner = true;
    this.dataStorageService.storeRecipes().subscribe(response => {
      this.showSaveDataSpinner = false;
    });
  }

  fetchData(): void {
    this.showFetchDataSpinner = true;
    this.dataStorageService.getRecipes().subscribe(response => {
      this.showFetchDataSpinner = false;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
  }
}
