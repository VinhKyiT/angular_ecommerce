import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  user: any;
  orders: any[] = [];
  error = '';
  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _product: ProductService
  ) {
    this.user = this._auth.getUser();
  }

  ngOnInit(): void {
    this._api.getTypeRequest('orders/all').subscribe(
      (res: any) => {
        console.log(res);
        res?.data?.forEach((item) => {
          this._product
            .getSingleProduct(item.product_id)
            .subscribe((product) => {
              this.orders.push({ ...product, ...item });
            });
        });
        // let uniqueProductsArray = Array.from(
        //   new Set(res.data.map((p) => p.product_id))
        // );
        // log the orders
        console.log(this.orders);
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }
}
