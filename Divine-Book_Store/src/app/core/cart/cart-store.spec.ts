import { TestBed } from '@angular/core/testing';
import { CartItem } from './cart-item';
import { CartState, initialState } from './cart-state';
import { CartStore } from './cart-store';

describe('CartStore', () => {

  let cartStore: CartStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartStore]
    });
    cartStore = TestBed.inject(CartStore);
  });

  it('should create an instance', () => {
    expect(cartStore).toBeTruthy();
  });


  it('[Test : Cart : Add] Addition of an item in Cart', () => {

    // Arrangement Test
    const currentState = initialState;
    expect(currentState.cartItems.length).toBe(0);

    const cartItem: CartItem = {
      book_id: "b001",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      category: "DSA",
      price: 1299.00,
      img: "src/assets/static/books-images/b001.jpg",
      quantity: 5,
      itemTotal: 12
    };

    // Action
    cartStore.addCartItem(cartItem);

    const expectedState = {
      cartItems: [cartItem]
    };

    // Assertion Test
    expect(cartStore.state).toEqual(expectedState);
  });


  it('[Test : Cart : Empty] Empty the cart', () => {

    // Arrangement Test
    const cartItem: CartItem = {
      book_id: "b001",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      category: "DSA",
      price: 1299.00,
      img: "src/assets/static/books-images/b001.jpg",
      quantity: 5,
      itemTotal: 12
    };

    cartStore.addCartItem(cartItem);

    const currentState = {
      cartItems: [cartItem]
    };

    expect(cartStore.state).toEqual(currentState);


    // Action
    cartStore.emptyCart();


    // Assertion Test
    expect(cartStore.state).toEqual(initialState);
  });


  it('[Test : Cart : Restore] Restore the cart', () => {

    // Arrangement Test
    const currentState = initialState;
    expect(cartStore.state).toEqual(currentState);

    const cartItem: CartItem = {
      book_id: "b001",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      category: "DSA",
      price: 1299.00,
      img: "src/assets/static/books-images/b001.jpg",
      quantity: 5,
      itemTotal: 12
    };

    const expectedState = {
      cartItems: [cartItem]
    };

    // Action
    cartStore.resoreCart(expectedState);

    // Assertion Test
    expect(cartStore.state).toEqual(expectedState);
  });


  it('[Test : Cart : Remove] Removal of an item in Cart', () => {

    // Arrangement Test

    const cartItem1: CartItem = {
      book_id: "b001",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      category: "DSA",
      price: 1299.00,
      img: "src/assets/static/books-images/b001.jpg",
      quantity: 5,
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

    const currentState = {
      cartItems: [cartItem1, cartItem2]
    };

    cartStore.resoreCart(currentState);

    expect(cartStore.state).toEqual(currentState);

    // Action
    cartStore.removeCartItem(cartItem1);

    // Assertion Test
    const expectedState: CartState = {
      cartItems: [cartItem2]
    };

    expect(cartStore.state).toEqual(expectedState);
  });


  it('[Test : Cart : Update]  Update the Cart', () => {

    // Arrangement Test

    const cartItem1: CartItem = {
      book_id: "b001",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      category: "DSA",
      price: 1299.00,
      img: "src/assets/static/books-images/b001.jpg",
      quantity: 5,
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

    const currentState = {
      cartItems: [cartItem1, cartItem2]
    };

    cartStore.resoreCart(currentState);

    expect(cartStore.state).toEqual(currentState);

    // Action
    const updatedCartItem1: CartItem = {
      book_id: "b001",
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      category: "DSA",
      price: 1299.00,
      img: "src/assets/static/books-images/b001.jpg",
      quantity: 7,
      itemTotal: 14
    };
     
    cartStore.updateCartItem(updatedCartItem1);

    // Assertion Test
    const expectedState: CartState = {
      cartItems: [ updatedCartItem1 ,cartItem2]
    };

    expect(cartStore.state).toEqual(expectedState);
  });

});
