import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../store/app.reducer';
import {map, take} from 'rxjs/operators';
import {Logout} from '../auth/store/auth.actions';
import {FetchRecipes, SET_RECIPES, STORE_RECIPES_DONE, StoreRecipes} from '../recipes/store/recipe.actions';
import {Actions, ofType} from '@ngrx/effects';

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

  constructor(private authService: AuthService, private store: Store<AppState>, private actions$: Actions) { }

  ngOnInit(): void {
    this.authSubscription = this.store.select('auth').pipe(map(authState => authState.user)).subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  saveData(): void {
    this.showSaveDataSpinner = true;
    this.store.dispatch(new StoreRecipes());
    this.actions$.pipe(ofType(STORE_RECIPES_DONE), take(1)).subscribe(() => {
      this.showSaveDataSpinner = false;
    });
  }

  fetchData(): void {
    this.showFetchDataSpinner = true;
    this.store.dispatch(new FetchRecipes());
    this.actions$.pipe(ofType(SET_RECIPES), take(1)).subscribe(() => {
      this.showFetchDataSpinner = false;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout(): void {
    this.store.dispatch(new Logout());
  }
}
