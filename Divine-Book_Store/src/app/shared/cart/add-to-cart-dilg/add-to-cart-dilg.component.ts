import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartItem } from '@core/cart/cart-item';

interface AddToCartDilgData
{
  cartItem: CartItem;
}

@Component({
  selector: 'dp-add-to-cart-dilg',
  templateUrl: './add-to-cart-dilg.component.html',
  styleUrls: ['./add-to-cart-dilg.component.scss']
})
export class AddToCartDilgComponent implements OnInit {

  cartItem: CartItem;

  constructor(
    @Inject(MAT_DIALOG_DATA) data : AddToCartDilgData,
    private router: Router,
    private matDialogRef: MatDialogRef<AddToCartDilgComponent>
  ) {
    this.cartItem = data.cartItem;
   }

  ngOnInit(): void {
  }

  goToCart()
  {
    this.router.navigate(['cart']).then(() => this.closeDialog());
  }

  continueShopping()
  {
    this.router.navigate(['books']).then(() => this.closeDialog());
  }

  closeDialog()
  {
    this.matDialogRef.close();
  }

}
