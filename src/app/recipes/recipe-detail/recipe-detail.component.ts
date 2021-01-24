import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.route.data.subscribe((data: Data) => {
      this.recipe = data.recipe;
    });
  }

  AddIngredientsToShoppinglist(ingredients: Ingredient[]): void {
    ingredients.map((ingredient) =>
      this.shoppingListService.addEditIngredient(ingredient)
     );
  }

  deleteRecipe(): void {
    const id = this.route.snapshot.params.id;
    const deleted = this.recipeService.deleteRecipe(+id);
    if (deleted) {
      this.router.navigate(['../']);
    }
  }
}
