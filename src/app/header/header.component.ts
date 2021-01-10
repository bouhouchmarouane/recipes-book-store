import {Component, OnInit} from '@angular/core';
import {Tabs} from '../shared/tabs.enum';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  eTabs = Tabs;
  showSaveDataSpinner = false;
  showFetchDataSpinner = false;

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  saveData(): void {
    this.showSaveDataSpinner = true;
    this.dataStorageService.storeRecipes().subscribe(response => {
      this.showSaveDataSpinner = false;
    });
  }

  fetchData(): void {
    this.showFetchDataSpinner = true;
    this.dataStorageService.getRecipes().subscribe(response => {
      this.recipeService.setRecipes(response);
      this.showFetchDataSpinner = false;
    });
  }
}
