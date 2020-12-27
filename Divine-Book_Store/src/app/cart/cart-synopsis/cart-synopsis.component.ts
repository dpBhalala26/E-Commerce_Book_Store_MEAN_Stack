import { Component, OnInit } from '@angular/core';
import { getCartSubTotal, getDeliveryCharge, getGSTCharge, getTotalCartItemsCount, getTotalOrderBill } from '@core/cart/cart-selector';
import { CartStore } from '@core/cart/cart-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'dp-cart-synopsis',
  templateUrl: './cart-synopsis.component.html',
  styleUrls: ['./cart-synopsis.component.scss']
})
export class CartSynopsisComponent implements OnInit {

  cartItemsCount: Observable<number>;
  cartSubTotal: Observable<number>;
  deliveryCharge: Observable<number>;
  gstCharge: Observable<number>;
  totalAmount: Observable<number>;


  constructor(private cartStore: CartStore) { }

  ngOnInit(): void {
    this.cartItemsCount = this.cartStore.select(getTotalCartItemsCount);
    this.cartSubTotal = this.cartStore.select(getCartSubTotal);
    this.deliveryCharge = this.cartStore.select(getDeliveryCharge);
    this.gstCharge = this.cartStore.select(getGSTCharge);
    this.totalAmount = this.cartStore.select(getTotalOrderBill);
  }

}
