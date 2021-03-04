import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit {
  title: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('recipes').subscribe(recipesState => {
      this.title = recipesState.recipes.length === 0 ? 'Please add a recipe' : 'Please select a recipe';
    });
  }

}
