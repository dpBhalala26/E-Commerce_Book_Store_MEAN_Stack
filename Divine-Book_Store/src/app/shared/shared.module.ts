import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { RouterModule } from '@angular/router';
import { DpNgMaterialModule } from './ng-material-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddToCartComponent } from './cart/add-to-cart/add-to-cart.component';
import { AddToCartDilgComponent } from './cart/add-to-cart-dilg/add-to-cart-dilg.component';
import { CountCartItemsComponent } from './cart/count-cart-items/count-cart-items.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AddToCartComponent, AddToCartDilgComponent, CountCartItemsComponent, FooterComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    RouterModule,
    DpNgMaterialModule,
  ],
  exports: [
    DpNgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    AddToCartComponent,
    CountCartItemsComponent,
    FooterComponent
  ],
  entryComponents: [AddToCartDilgComponent]
})
export class SharedModule {}
