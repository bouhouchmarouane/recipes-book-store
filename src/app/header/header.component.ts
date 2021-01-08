import {Component, OnInit} from '@angular/core';
import {Tabs} from '../shared/tabs.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  eTabs = Tabs;

  constructor() { }

  ngOnInit(): void {
  }

}
