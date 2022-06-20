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
    private CategoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.ProductService.getAllProducts().subscribe(
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
}
