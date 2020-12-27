import { Injectable } from '@angular/core';
import { Store } from '@core/Store';
import { CartItem } from './cart-item';
import { CartState, initialState } from './cart-state';

@Injectable({
    providedIn: 'root',
})

export class CartStore extends Store<CartState> {

    constructor() {
        super(initialState);
    }

    addCartItem(cartItemToAdd: CartItem) {
        console.log('[Test : Cart : Add] Addition of an item in Cart');
        const newState = {
            ... this.state,  // Books (Cart Items)
            cartItems: [].concat(this.state.cartItems, cartItemToAdd)
        };
        this.setState(newState);
    }

    emptyCart() {
        console.log('[Test : Cart : Empty] Empty the cart');
        const newState = initialState;
        this.setState(newState);
    }

    resoreCart(expectedRestoreState: CartState) {
        console.log('[Test : Cart : Restore] Restore the cart');
        this.setState(expectedRestoreState);
    }

    removeCartItem(cartItemToRemove: CartItem) {
        console.log('[Test : Cart : Remove] Removal of an item in Cart');
        const newState = {
            ... this.state,  // Books (Cart Items)
            cartItems: this.state.cartItems.filter(ci => ci.book_id !== cartItemToRemove.book_id)
        };
        this.setState(newState);
    }

    updateCartItem(cartItemToUpdate: CartItem) {
        console.log('[Test : Cart : Update]  Update the Cart');
        const newState = {
            ... this.state,  // Books (Cart Items)
            cartItems: this.state.cartItems.map(ci => (ci.book_id === cartItemToUpdate.book_id) ? cartItemToUpdate : ci)
        };
        this.setState(newState);
    }
}
