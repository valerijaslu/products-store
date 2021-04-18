import { Injectable } from '@angular/core';
import { Product } from '../common/models/product';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbService } from './breadcrumb.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private breadcrumbService: BreadcrumbService
  ) { }

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

  setPageTitle(route: ActivatedRoute): void {
    route.data.pipe(
      filter(res => !!res),
      first()
    ).subscribe((routerData) => {
      this.breadcrumbService.setTitle(routerData.title);
    })
  }
}
