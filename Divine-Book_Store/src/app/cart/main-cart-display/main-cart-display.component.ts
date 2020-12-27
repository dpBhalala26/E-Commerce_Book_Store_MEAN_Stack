import { Component, OnInit } from '@angular/core';
import { CartItem } from '@core/cart/cart-item';
import { getCartItems, getTotalCartItemsCount } from '@core/cart/cart-selector';
import { CartStore } from '@core/cart/cart-store';
import { ALLOWED_BOOK_QUANTITIES, CartService } from '@core/cart/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'dp-main-cart-display',
  templateUrl: './main-cart-display.component.html',
  styleUrls: ['./main-cart-display.component.scss']
})
export class MainCartDisplayComponent implements OnInit {

  cartItemsCount: Observable<number>;
  cartItems: Observable<CartItem[]>;
  availableQuantities: number[];
  disCols = ['img', 'title', 'price', 'quantity', 'remove'];
  
  constructor(private cartStore: CartStore, private cartService: CartService) { }

  ngOnInit(): void {
    this.availableQuantities = ALLOWED_BOOK_QUANTITIES;
    this.cartItemsCount = this.cartStore.select(getTotalCartItemsCount);
    this.cartItems = this.cartStore.select(getCartItems);
  }

  updateCartItem( {value}, cartItem: CartItem)
  {
    console.log('Trying to update quantity from main-card-display component page');
    this.cartService.updateCartItem({...cartItem, quantity: value});
  }

  removeCartItem(cartItem: CartItem)
  {
    console.log('Trying to remove item from main-card-display component page');
    this.cartService.removeCartItem(cartItem);
  }

}
