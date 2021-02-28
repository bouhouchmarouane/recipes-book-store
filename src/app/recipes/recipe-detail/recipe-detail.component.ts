import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {Store} from '@ngrx/store';
import {AddIngredients} from '../../shopping-list/store/shopping-list.actions';
import {AppState} from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private shoppingListStore: Store<AppState>) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.recipe = data.recipe;
    });
  }

  AddIngredientsToShoppinglist(ingredients: Ingredient[]): void {
    this.shoppingListStore.dispatch(new AddIngredients(ingredients));
  }

  deleteRecipe(): void {
    const id = this.route.snapshot.params.id;
    const deleted = this.recipeService.deleteRecipe(+id);
    if (deleted) {
      this.router.navigate(['../']);
    }
  }
}
