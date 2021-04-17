import { Injectable } from '@angular/core';
import { Product } from '../common/models/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProductsCategories(products: Product[]): string[] {
    const categories = products.map(product => product.category);
    const uniqueCategories = new Set(categories);

    return [...uniqueCategories];
  }


  private selectedProduct = new BehaviorSubject<Product | null>(null);

  get getSelectedProduct$(): Observable<Product | null> {
    return this.selectedProduct.asObservable();
  }

  setSelectedProduct(product: Product | null) {
    this.selectedProduct.next(product);
  }
}
