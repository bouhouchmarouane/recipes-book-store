import {Component, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {AppState} from './store/shopping-list.reducer';
import {StartEdit} from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  editingIngId: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    this.store.select('shoppingList').subscribe(stateData => {
      this.editingIngId = stateData.editedIngredientId;
    });
  }

  editIngredient(idIng: number): void {
    this.store.dispatch(new StartEdit(idIng));
  }
}
