import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {ShoppingListComponent} from './shopping-list.component';
import {ShoppingEditComponent} from './shopping-edit/shopping-edit.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    ReactiveFormsModule,
    [RouterModule.forChild([
      {path: 'shoppinglist', component: ShoppingListComponent}
    ])],
    SharedModule
  ],
})
export class ShopingListModule {

}
