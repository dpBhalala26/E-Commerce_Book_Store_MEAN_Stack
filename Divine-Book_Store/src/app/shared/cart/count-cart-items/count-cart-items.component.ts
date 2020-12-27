import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { getTotalCartItemsCount } from '@core/cart/cart-selector';
import { CartStore } from '@core/cart/cart-store';
import { Observable } from 'rxjs';

@Component({
  selector: 'dp-count-cart-items',
  templateUrl: './count-cart-items.component.html',
  styleUrls: ['./count-cart-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountCartItemsComponent implements OnInit {

  totalInCart$: Observable<number>;
  
  constructor(private cartStore: CartStore) { }

  ngOnInit(): void {
    this.totalInCart$ = this.cartStore.select(getTotalCartItemsCount);
  }

}
