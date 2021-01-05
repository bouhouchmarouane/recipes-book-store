import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeForm: FormGroup;
  editMode = false;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }

  private initForm(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl(null),
      imagePath: new FormControl(null),
      description: new FormControl(null),
      ingredients: new FormArray([])
    });
  }

  private populateForm(): void {
    const recipeId = +this.route.snapshot.params.id;
    this.editMode = !isNaN(recipeId);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(recipeId);
      this.recipeForm.patchValue({
        name: recipe.name,
        imagePath: recipe.imagePath,
        description: recipe.description
      });
      for (const ingredient of recipe.ingredients){
        (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
          name: new FormControl(ingredient.name),
          amount: new FormControl(ingredient.amount)
        }));
      }
    }
  }

  addSaveRecipe(): void {
    console.log(this.recipeForm);
  }

  get ingredientsControl(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
