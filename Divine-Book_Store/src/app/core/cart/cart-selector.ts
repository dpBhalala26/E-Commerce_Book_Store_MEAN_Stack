import { CartState } from './cart-state';
import { createSelector } from 'reselect';

// Gives total number of items
export const getTotalCartItemsCount = (paraState: CartState) => {
    const cartItems = paraState.cartItems;
    const totalCartItemsCount = cartItems.reduce((totalCount, currentItem) => totalCount + currentItem.quantity, 0);
    return totalCartItemsCount;
};

export const getCartItems = (state: CartState) => state.cartItems;
// It will get all cart items and filters by book_id
export const getIsItemAlreadyInCart = (book_id: string) => createSelector(getCartItems, (items) => items.filter(item => item.book_id === book_id).length > 0);

export const getCartSubTotal = createSelector(
    getCartItems, (items) =>
    items.reduce((subTotal, currentItem) => subTotal + currentItem.itemTotal, 0)
);

const DELIVERY_CHARGE = 0.05;
export const getDeliveryCharge = createSelector(
    getCartSubTotal,
    (subTotal) => subTotal * DELIVERY_CHARGE
);

const GST = 0.12;
export const getGSTCharge = createSelector(
    getCartSubTotal,
    (subTotal) => subTotal * GST
);

export const getTotalOrderBill = createSelector(
    getCartSubTotal,
    getDeliveryCharge,
    getGSTCharge,
    (cartSubTotal, deliveryCharge, gstCharge) => cartSubTotal + deliveryCharge + gstCharge
);