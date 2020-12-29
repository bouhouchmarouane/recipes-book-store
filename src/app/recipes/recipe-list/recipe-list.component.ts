import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Test1', 'This is simply a test1', 'https://static01.nyt.com/images/2020/01/24/dining/yk-gochujang-chicken-and-vegetables/merlin_167664060_7435c624-7225-4cb1-b104-4d67761185a4-articleLarge.jpg'),
    new Recipe('Test2', 'This is simply a test2', 'https://cookieandkate.com/images/2020/03/vegan-chana-masala-recipe-2-550x824.jpg'),
    new Recipe('Test3', 'This is simply a test3', 'https://www.cookwithmanali.com/wp-content/uploads/2014/08/Poha-Recipe.jpg')
  ];

  @Output() recipeSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedRecipe(recipe: Recipe): void {
    this.recipeSelected.emit(recipe);
  }
}
