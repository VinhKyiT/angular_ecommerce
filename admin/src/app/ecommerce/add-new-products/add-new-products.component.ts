import { Router } from '@angular/router';
import { CategoryService } from './../../services/category.service';
import { Product } from './../../../../../client/src/app/shared/models/product.model';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-new-products',
  templateUrl: './add-new-products.component.html',
  styleUrls: ['./add-new-products.component.scss'],
})
export class AddNewProductsComponent implements OnInit {
  listCategory: any[] = [];

  product: any = {
    title: '',
    image:
      'https://pembrokefoodstore.com/themes/groceryshop/images/no-image-placeholder.png',
    images: '',
    description: '',
    price: '',
    quantity: '',
    cat_id: '',
    short_desc: '',
  };

  constructor(
    private _category: CategoryService,
    private _product: ProductService,
    private _router: Router
  ) {}

  onSubmit() {
    this.product.short_desc = this.product.description.substring(0, 100);
    console.log(this.product);
    this._product.addProduct(this.product).subscribe((data) => {
      if (data?.message === 'success') {
        this._router.navigate(['/ecommerce/products']);
      }
    });
  }

  canUpdate() {
    return (
      this.product.title &&
      this.product.description &&
      this.product.price &&
      this.product.quantity &&
      this.product.cat_id
    );
  }

  ngOnInit(): void {
    this._category
      .getAllCategories()
      .pipe()
      .subscribe((data) => {
        this.listCategory = data;
      });
    $.getScript('./assets/plugins/Drag-And-Drop/imageuploadify.min.js');
    $.getScript('./assets/js/add-new-product-image-upload.js');
  }
}
