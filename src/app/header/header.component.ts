import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Tabs} from '../tabs.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() activeTab = new EventEmitter<string>();
  eTabs = Tabs;
  selectedTab = this.eTabs.Recipes;

  constructor() { }

  ngOnInit(): void {
  }

  goto(tab: string): void {
    this.activeTab.emit(tab);
    this.selectedTab = tab;
  }
}
