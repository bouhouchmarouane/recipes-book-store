import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
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
      name: new FormControl(null, Validators.required),
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
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^(-)?[0-9]*$'), Validators.min(1)])
        }));
      }
    }
  }

  addSaveRecipe(): void {
    console.log((this.recipeForm.get('ingredients') as FormArray).controls);
    console.log(this.recipeForm);
  }

  get ingredientsControl(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  ingredientError(control: string, errorType: string): boolean {
    return this.ingredientsControl.some((ingControl: AbstractControl) => {
      return !ingControl.get(control)?.valid && ingControl.get(control)?.dirty
        && ingControl.get(control)?.errors !== null
        && ingControl.get(control)?.errors[errorType] !== undefined;
    });
  }

  getInputValidationClass(control: AbstractControl): string {
    return !control.valid && control.dirty ? 'is-invalid' : control.dirty ? 'is-valid' : '';
  }

  addIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^(-)?[0-9]*$'), Validators.min(1)])
    }));
  }

  removeIngredient(i: number): void {
    (this.recipeForm.get('ingredients') as FormArray).controls.splice(i, 1);
  }
}
