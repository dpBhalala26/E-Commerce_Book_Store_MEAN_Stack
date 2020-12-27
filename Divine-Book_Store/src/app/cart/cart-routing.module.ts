import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartSynopsisComponent } from './cart-synopsis/cart-synopsis.component';
import { MainCartDisplayComponent } from './main-cart-display/main-cart-display.component';

const routes: Routes = [
  {
    path: "",
    component: MainCartDisplayComponent
  },
  {
    path: "synopsis",
    component: CartSynopsisComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
