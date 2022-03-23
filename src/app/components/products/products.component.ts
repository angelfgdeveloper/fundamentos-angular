import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Product, CreateProductDTO, UpdateProductDTO } from 'src/app/models/product.model';

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
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    title: '',
    price: 0,
    images: [],
    description: '',
    category: {
      id: '',
      name: ''
    }
  };
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    // // this.productsService.getAllProducts()
    // this.productsService.getProductByPage(10, 0)
    // .subscribe(data => {
    //   // console.log(data);
    //   this.products = data;
    // });
    this.loadMore();
  }

  onAddToShoppingCart(product: Product) {
    // console.log(product);
    // this.myShoppingCart.push(product);
    this.storeService.addProduct(product);

    // this.total = this.myShoppingCart.reduce((sum, item) => sum + item.price, 0);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  // onShowDetail1(id: string) {
  //   // console.log(id);
  //   this.productsService.getProduct(id)
  //   .subscribe((data) => {
  //     // console.log({ product: data });
  //     this.toggleProductDetail();
  //     this.productChosen = data;
  //   });
  // }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';

    this.productsService.getProduct(id).subscribe({
      next: (data) => {
        this.toggleProductDetail();
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      error: (response) => {
        // console.log(response.error.message);
        console.log(response);
        window.alert(response);
        this.statusDetail = 'error';
      }
    });
  }

  readAndUpdate(id: string) {
    this.productsService.getProduct(id)
    .pipe( // switchMap - correr una tras de otra
      switchMap((product) => this.productsService.update(product.id, { title: 'Change' })),
      // switchMap((product) => this.productsService.update(product.id, { title: 'Change' }))
    )
    .subscribe(data => {
      // const product = data;
      // this.productsService.update(product.id, { title: 'Change' })
      // .subscribe(rtaUpdate => {
      //   console.log(rtaUpdate);
      // })

      console.log(data);
    });

    // zip( // zip - correr todo al mismo tiempo (Ponerla en el servicio)
    //   this.productsService.getProduct(id),
    //   this.productsService.update(id, { title: 'Nuevo' }),
    // )
    this.productsService.fetchReadAndUpdate(id, { title: 'Nuevo' })
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo Producto',
      description: 'Laborum velit deserunt incididunt ullamco non anim aliquip Lorem cillum pariatur sunt ipsum.',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 1000,
      categoryId: 2,
    };

    this.productsService.create(product)
    .subscribe((data) => {
      // console.log('created', data);
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'New Title',
      description: 'Esta es un prueba',
    }

    const id = this.productChosen.id;
    this.productsService.update(id, changes)
    .subscribe((data) => {
      // console.log('Updated', data);
      const productIndex = this.products.findIndex((p) => p.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex((p) => p.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.productsService.getProductByPage(this.limit, this.offset)
    .subscribe(data => {
      // this.products = data;
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }

}
