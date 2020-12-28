import { Component } from '@angular/core';
import {Tabs} from './tabs.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  eTabs = Tabs;
  activeTab = Tabs.Recipes;

  onTabClick(selectedTab: string): void {
    this.activeTab = selectedTab;
  }
}
