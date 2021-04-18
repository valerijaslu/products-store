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
}
