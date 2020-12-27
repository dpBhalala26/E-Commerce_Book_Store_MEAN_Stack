import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartSynopsisComponent } from './cart-synopsis/cart-synopsis.component';
import { MainCartDisplayComponent } from './main-cart-display/main-cart-display.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CartSynopsisComponent, MainCartDisplayComponent],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
