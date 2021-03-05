import {Component, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AddIngredients} from '../../shopping-list/store/shopping-list.actions';
import {AppState} from '../../store/app.reducer';
import {DeleteRecipe} from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private route: ActivatedRoute, private router: Router, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.recipe = data.recipe;
      if (this.recipe === undefined) {
        this.router.navigate(['../']);
      }
    });
  }

  AddIngredientsToShoppinglist(ingredients: Ingredient[]): void {
    this.store.dispatch(new AddIngredients(ingredients));
  }

  deleteRecipe(): void {
    if (confirm('Are you sure to delete this recipe ?')) {
      const id = this.route.snapshot.params.id;
      this.store.dispatch(new DeleteRecipe(id));
      this.router.navigate(['../']);
    }
  }
}
