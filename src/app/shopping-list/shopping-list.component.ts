import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from './store/shopping-list.reducer';
import {StartEdit} from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  editingIngId: number;
  editIngSub: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.ingredients = this.shoppingListService.ingredients;
    this.ingredients = this.store.select('shoppingList');

    // @ts-ignore
    this.editIngSub = this.shoppingListService.editingIngredientSub.subscribe((idIng: number) => this.editingIngId = idIng);
  }

  editIngredient(idIng: number): void {
    // this.shoppingListService.editingIngredientSub.next(idIng);
    this.store.dispatch(new StartEdit(idIng));
  }

  ngOnDestroy(): void {
    this.editIngSub.unsubscribe();
  }
}
