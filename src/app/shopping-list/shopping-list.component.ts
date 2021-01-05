import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  editingIngId: number;
  editIngSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.ingredients;
    // @ts-ignore
    this.editIngSub = this.shoppingListService.editingIngredientSub.subscribe((idIng: number) => this.editingIngId = idIng);
  }

  editIngredient(idIng: number): void {
    this.shoppingListService.editingIngredientSub.next(idIng);
  }

  ngOnDestroy(): void {
    this.editIngSub.unsubscribe();
  }
}
