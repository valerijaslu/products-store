import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { share } from 'rxjs/operators';

import { Product } from '../common/models/product';
import { Products } from './mock-products';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(Products).pipe(share());
  }

  getProductById(id: string): Observable<Product> {
     const product: Product = Products.filter(product => product.id === id)[0];
     return of(product);
  }

  addProduct(product: Product): Observable<boolean> {
    const newId = +Products[Products.length - 1].id + 1;
    Products.push({...product, id: newId.toString()});

    return of(true);
  }

  editProduct(editedProduct: Product): Observable<boolean> {
    Products.forEach(product => {
      if (product.id === editedProduct.id) {
        Products[+product.id - 1] = editedProduct;
      }

      return product;
    });

    return of(true);
  }

  fileUpload(image: File): Observable<boolean> {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return of(true);
  }

}
