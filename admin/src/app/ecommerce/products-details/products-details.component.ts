import { CategoryService } from './../../services/category.service';
import { Product } from './../../shared/models/product.model';
import { CartService } from './../../services/cart.service';
import { ProductService } from './../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.scss'],
})
export class ProductsDetailsComponent implements OnInit {
  id: number;
  product: Product;
  quantity: number;
  showcaseImages: any[] = [];
  loading = false;
  listCategory: any[] = [];
  categorySelected: any;
  currentCategory: any;

  constructor(
    private _route: ActivatedRoute,
    private _product: ProductService,
    private _cart: CartService,
    private _category: CategoryService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this._route.paramMap
      .pipe(
        map((param: any) => {
          return param?.params?.id;
        })
      )
      .subscribe((productId) => {
        // returns string so convert it to number
        this.id = parseInt(productId);
        this._product.getSingleProduct(productId).subscribe((product) => {
          console.log(product);
          this.product = product;
          if (product?.quantity === 0) this.quantity = 0;
          else this.quantity = 1;

          if (product?.images) {
            this.showcaseImages = product.images.split(';');
          }
          this.loading = false;
        });
      });
    this._category.getAllCategories().subscribe((res) => {
      this.listCategory = [...res];
      this.currentCategory = this.listCategory.filter(
        (c) => c?.title === this.product.category
      )[0];
      if (this.currentCategory) {
        this.categorySelected = this.currentCategory.id;
      }
    }),
      (err) => {
        console.log({ err });
      };
  }

  onUpdateProduct(product?: Product) {
    this._product
      .updateProduct(this.product, this.categorySelected)
      .subscribe((res) => {
        console.log(res);
      }),
      (err) => {
        console.log(err);
      };
  }

  addToCart(): void {
    if (this.quantity > 0) {
      this._cart.addProduct({
        id: this.id,
        price: this.product.price,
        quantity: this.quantity,
        image: this.product.image,
        title: this.product.title,
        maxQuantity: this.product.quantity,
      });
    }
  }
}
