import { Injectable } from '@angular/core';
import { Book } from '@core/Book';
import { LogService } from '@core/utils/log.service';
import { of } from 'rxjs';
import { CartItem } from './cart-item';
import { CartStore } from './cart-store';

export const ALLOWED_BOOK_QUANTITIES = Array.from(
  { length: 20 },
  (v, i) => i + 1
);

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private cartStore: CartStore, private logService: LogService) {}

  addToCart(book: Book, quantity: number) {
    this.logService.log('[Cart] add item');
    const cartItemToAdd = {
      ...book,
      quantity,
      itemTotal: book.price * quantity,
    };
    this.cartStore.addCartItem(cartItemToAdd);
    return of(cartItemToAdd);
  }

  updateCartItem(cartItemToUpdate: CartItem) {
    cartItemToUpdate = {
      ...cartItemToUpdate,
      itemTotal: cartItemToUpdate.price * cartItemToUpdate.quantity,
    };
    this.cartStore.updateCartItem(cartItemToUpdate);
    return of(cartItemToUpdate);
  }

  removeCartItem(itemToRemove: CartItem) {
    this.cartStore.removeCartItem(itemToRemove);
    return of(itemToRemove);
  }
}
