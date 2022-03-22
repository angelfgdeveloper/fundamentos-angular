import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';

import { StoreService } from '../../services/store.service';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [];
  today = new Date();
  date = new Date(2022, 5, 22);

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.productsService.getAllProducts()
    .subscribe(data => {
      // console.log(data);
      this.products = data;
    });
  }

  onAddToShoppingCart(product: Product) {
    // console.log(product);
    // this.myShoppingCart.push(product);
    this.storeService.addProduct(product);

    // this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
    this.total = this.storeService.getTotal();
  }

}
