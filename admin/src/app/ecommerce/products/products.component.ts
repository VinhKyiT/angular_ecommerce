import { CartService } from './../../services/cart.service';
import { CategoryService } from './../../services/category.service';
import { Product } from './../../shared/models/product.model';
import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: any[] = [];
  loading = false;
  productPageCounter = 1;
  additionalLoading = false;
  isEndList = false;

  constructor(
    private ProductService: ProductService,
    private CategoryService: CategoryService,
    private CartService: CartService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.ProductService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log(res);
          this.products = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
      this.CategoryService.getAllCategories().subscribe(
        (res: any) => {
          this.categories = res;
          this.loading = false;
        },
        (err) => {
          console.log(err);
          this.loading = false;
        }
      );
    }, 500);
  }
  showMoreProducts(): void {
    this.additionalLoading = true;
    this.productPageCounter = this.productPageCounter + 1;
    setTimeout(() => {
      this.ProductService.getAllProducts(9, this.productPageCounter).subscribe(
        (res: any) => {
          console.log({ res });
          if (res?.length === 0) {
            console.log('end list');
            this.isEndList = true;
          }
          this.products = [...this.products, ...res];
          this.additionalLoading = false;
        },
        (err) => {
          console.log(err);
          this.additionalLoading = false;
        }
      );
    }, 500);
  }
}
