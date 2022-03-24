import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';

import { environment } from './../../environments/environment';
import { checkTime } from '../interceptors/time.interceptor';

import {
  Product,
  CreateProductDTO,
  UpdateProductDTO,
} from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private apiUrl = `${environment.API_URL}/api/v1`;

  constructor(private http: HttpClient) {}

  getAllProducts(limit?: number, offset?: number) {
    // return this.http.get<Product[]>('https://fakestoreapi.com/products');
    // return this.http.get<Product[]>('https://young-sands-07814.herokuapp.com/api/products/');
    let params = new HttpParams();
    if (limit && offset) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params, context: checkTime()
    }).pipe(
      retry(3),
      map((products) =>
        products.map((item) => {
          return {
            ...item,
            taxes: .16 * item.price
          };
        })
      )
    ); // Reintentar peticion
  }

  fetchReadAndUpdate(id: string, dto: UpdateProductDTO) {
    return zip( // zip - correr todo al mismo tiempo (Ponerla aqui)
    this.getProduct(id),
    this.update(id, dto),
  );
  // .subscribe(response => {
  //   const read = response[0];
  //   const update = response[1];
  // })
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === HttpStatusCode.Conflict) {
          return throwError(
            () => new Error('Ups algo esta fallando en el server')
          );
        }

        if (error.status === HttpStatusCode.NotFound) {
          return throwError(() => new Error('El producto no existe'));
        }

        if (error.status === HttpStatusCode.Unauthorized) {
          return throwError(() => new Error('No estas autorizado'));
        }

        return throwError(() => new Error('Ups algo salio mal'));
      })
    );
  }

  getProductByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: { limit, offset },
    });
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/products`, dto);
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/products/${id}`);
  }
}
