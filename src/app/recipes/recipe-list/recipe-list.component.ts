import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSubscription: Subscription;

  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService, private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.recipes = this.recipeService.recipes;
    // this.recipesSubscription = this.recipeService.recipesSub.subscribe(recipes => this.recipes = recipes);
    this.recipesSubscription = this.store.select('recipes').pipe(map(recipesState => recipesState.recipes))
      .subscribe(recipes => this.recipes = recipes);
  }

  ngOnDestroy(): void {
    this.recipesSubscription.unsubscribe();
  }
}
