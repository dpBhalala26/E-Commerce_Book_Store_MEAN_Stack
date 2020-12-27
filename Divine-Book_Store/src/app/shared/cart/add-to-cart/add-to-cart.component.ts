import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '@core/Book';
import { CartItem } from '@core/cart/cart-item';
import { getIsItemAlreadyInCart } from '@core/cart/cart-selector';
import { CartStore } from '@core/cart/cart-store';
import { ALLOWED_BOOK_QUANTITIES, CartService } from '@core/cart/cart.service';
import { Observable } from 'rxjs';
import { AddToCartDilgComponent } from '../add-to-cart-dilg/add-to-cart-dilg.component';

@Component({
  selector: 'dp-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddToCartComponent implements OnInit {

  @Input() book: Book
  availableQuantities: number[];
  quantity: number;
  isItemAlreadyInCart: Observable<boolean>;
  
  constructor(private cartStore: CartStore, private cartService: CartService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.availableQuantities = ALLOWED_BOOK_QUANTITIES;
    this.isItemAlreadyInCart = this.cartStore.select(getIsItemAlreadyInCart(this.book.book_id));
    this.quantity = 1;
  }

  addItemToCart(){
    this.cartService.addToCart(this.book, this.quantity).subscribe((cartItem) => this.openDialog(cartItem));
  }

  openDialog(cartItem: CartItem)
  {
    this.matDialog.open(AddToCartDilgComponent, {
      //width: '350px',
      //height: '250px',
      data: { cartItem },
      disableClose: true,
    });
  }

}
