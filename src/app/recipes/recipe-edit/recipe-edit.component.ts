import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, UrlTree} from '@angular/router';
import {RecipeService} from '../recipe.service';
import {CanComponentDeactivate} from '../can-deactivate-recipe-guard.service';
import {Observable} from 'rxjs';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, CanComponentDeactivate {
  recipeForm: FormGroup;
  editMode = false;
  recipe: Recipe;
  submitted = false;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    this.populateForm();
  }

  private initForm(): void {
    this.recipeForm = new FormGroup({
      id: new FormControl(null),
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
      this.recipe = this.recipeService.getRecipe(recipeId);
      this.recipeForm.patchValue({
        id: this.recipe.id,
        name: this.recipe.name,
        imagePath: this.recipe.imagePath,
        description: this.recipe.description
      });
      for (const ingredient of this.recipe.ingredients){
        (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
          id: new FormControl(ingredient.id),
          name: new FormControl(ingredient.name, Validators.required),
          amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^(-)?[0-9]*$'), Validators.min(1)])
        }));
      }
    }
  }

  addSaveRecipe(): void {
    this.submitted = true;
    const id = this.recipeService.addEditRecipe(this.recipeForm.value);
    if (this.editMode) {
      this.cancel();
    } else {
      this.router.navigate(['../', id], {relativeTo: this.route});
    }
  }

  get ingredientsControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  ingredientError(control: string, errorType: string): boolean {
    return this.ingredientsControls.some((ingControl: AbstractControl) => {
      return !ingControl.get(control)?.valid && ingControl.get(control)?.dirty
        && ingControl.get(control)?.errors !== null
        // @ts-ignore
        && ingControl.get(control)?.errors[errorType] !== undefined;
    });
  }

  getInputValidationClass(control: AbstractControl): string {
    return !control.valid && control.dirty ? 'is-invalid' : control.dirty ? 'is-valid' : '';
  }

  addIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^(-)?[0-9]*$'), Validators.min(1)])
    }));

    // console.log((this.ingredientsControls[this.ingredientsControls.length - 1]?.get('name') as any).nativeElement);
  }

  removeIngredient(i: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
  }

  cancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(): (Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree) {
    if ((this.recipeForm.dirty || this.recipe.ingredients.length !== this.ingredientsControls.length) && !this.submitted) {
      return confirm('Do you want to discard the changes ?');
    } else {
      return true;
    }
  }
}
