import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from '../recipe.model';
import {Observable} from 'rxjs';
import {RecipeService} from '../recipe.service';
import {DataStorageService} from '../../shared/data-storage.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe> {

  constructor(private dataStorageService: DataStorageService, private store: Store<AppState>) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    let recipe;
    this.store.select('recipes').pipe(map(recipesState => {
      return recipesState.recipes.find(r => {
        return r.id === +route.params.id;
      });
    })).subscribe(rcp => recipe = rcp);
    // @ts-ignore
    return recipe;
  }
}

