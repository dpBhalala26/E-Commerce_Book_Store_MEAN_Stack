import { CartItem } from './cart-item';
import { getIsItemAlreadyInCart, getTotalCartItemsCount } from './cart-selector';
import { CartState } from "./cart-state";

const given = beforeEach;
const when = beforeEach;
const then = it;

describe("Check for Cart Store Selectors", () => {
  describe("Get Total Items in the Cart Currently", () => {
    let cartState: CartState;
    let result: number;
    let cartItem1Exists: any;
    let cartItem3Exists: any;

    given(() => {
        const cartItem1: CartItem = {
            book_id: "b001",
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            category: "DSA",
            price: 1299.00,
            img: "src/assets/static/books-images/b001.jpg",
            quantity: 6,
            itemTotal: 12
          };
          const cartItem2: CartItem = {
            book_id: "b002",
            title: "Machine Learning using Python",
            author: "Dinesh Pradhan",
            category: "Data Science",
            price: 534.00,
            img: "src/assets/static/books-images/b002.jpg",
            quantity: 3,
            itemTotal: 12
          };
      cartState = {
        cartItems: [cartItem1, cartItem2]
      };
    });

    when(() => {
      result = getTotalCartItemsCount(cartState);
      cartItem1Exists = getIsItemAlreadyInCart('b001')(cartState);
      cartItem3Exists = getIsItemAlreadyInCart('b003')(cartState);
    });

    then("[Cart-Selector : Total Count] Total Count Test", () => {
      expect(result).toBe(9);
    });

    then("[Cart-Selector : Find Item] Find Cart Item", () => {
      expect(cartItem1Exists).toBeTruthy();
      expect(cartItem3Exists).toBeFalsy();
    });
  });
});