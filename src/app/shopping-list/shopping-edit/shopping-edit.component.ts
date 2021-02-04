import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as shoppingListReducer from '../store/shopping-list.reducer';
import {StopEdit} from '../store/shopping-list.actions';

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

  constructor(private shoppingListService: ShoppingListService, private store: Store<shoppingListReducer.AppState>) { }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^(-)?[0-9]*$'), Validators.min(1)])
    });

    this.editIngSub = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientId > -1) {
        this.idIngredient = stateData.editedIngredientId;
        const ingredient = stateData.editedIngredient;
        this.ingredientForm.setValue({
          name: ingredient?.name,
          amount: ingredient?.amount
        });
        this.editMode = true;
      }
      else {
        this.editMode = false;
      }
    });
  }

  addSaveIngredient(): void {
    const name = this.ingredientForm.get('name')?.value;
    const amount = this.ingredientForm.get('amount')?.value;
    this.shoppingListService.addEditIngredient(new Ingredient(this.editMode ? this.idIngredient : null, name, amount as number));
    this.resetForm();
  }

  ngOnDestroy(): void {
    this.editIngSub.unsubscribe();
    this.store.dispatch(new StopEdit());
  }

  resetForm(): void {
    this.ingredientForm.reset();
    this.editMode = false;
    this.store.dispatch(new StopEdit());
  }

  deleteIngredient(): void {
    if (confirm('Are you sure to delete this ingredient ? ')) {
      this.shoppingListService.deleteIngredient();
    }
    this.resetForm();
  }
}
