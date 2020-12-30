import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from './recipe.model';
import {RecipeService} from '../shared/recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipeSelected: Recipe | undefined;

  constructor() { }

  ngOnInit(): void {
  }
}
