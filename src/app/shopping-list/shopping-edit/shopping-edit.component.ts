import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  ingredientForm: FormGroup;
  editIngSub: Subscription;
  editMode = false;
  idIngredient: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^(-)?[0-9]*$'), Validators.min(1)])
    });

    this.editIngSub = this.shoppingListService.editingIngredientSub.subscribe(idIng => {
      if (idIng !== null) {
        this.editIngredient(idIng);
      }
    });
  }

  addSaveIngredient(): void {
    const name = this.ingredientForm.get('name')?.value;
    const amount = this.ingredientForm.get('amount')?.value;
    this.shoppingListService.addEditIngredient(new Ingredient(this.editMode ? this.idIngredient : null, name, amount as number));
    this.resetForm();
  }

  editIngredient(idIng: number): void {
    this.idIngredient = idIng;
    const ingredient = this.shoppingListService.findIngredientById(idIng);
    this.ingredientForm.setValue({
      name: ingredient.name,
      amount: ingredient.amount
    });
    this.editMode = true;
  }

  ngOnDestroy(): void {
    this.editIngSub.unsubscribe();
  }

  resetForm(): void {
    this.ingredientForm.reset();
    this.editMode = false;
    this.shoppingListService.editingIngredientSub.next(null);
  }

  deleteIngredient(): void {
    if (confirm('Are you sure to delete this ingredient ? ')) {
      this.shoppingListService.deleteIngredient(this.idIngredient);
    }
    this.resetForm();
  }
}
