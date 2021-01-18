import {Component, OnDestroy, OnInit} from '@angular/core';
import {Tabs} from '../shared/tabs.enum';
import {DataStorageService} from '../shared/data-storage.service';
import {RecipeService} from '../recipes/recipe.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  eTabs = Tabs;
  showSaveDataSpinner = false;
  showFetchDataSpinner = false;
  private authSubscription: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
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
      this.showFetchDataSpinner = false;
    });
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
