import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  ingredientForm: FormGroup;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredientForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)])
    });
  }

  addIngredient(name: string, amount: string): void {
    this.shoppingListService.addIngredient(new Ingredient(name, parseInt(amount)));
  }

  onSubmit(): void {
    console.log(this.ingredientForm);
    const name = this.ingredientForm.get('name')?.value;
    const amount = this.ingredientForm.get('amount')?.value;
    this.shoppingListService.addIngredient(new Ingredient(name, amount as number));
    //this.ingredientForm.reset();
  }

  numeric
}
