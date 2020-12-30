import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from '../../recipe.model';
import {RecipeService} from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe | undefined;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  gotoRecipe(): void {
    // this.recipeSelected.emit(this.recipe);
    this.recipeService.selectedRecipe.emit(this.recipe);
  }
}
