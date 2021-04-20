import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';

import { Product } from '../../common/models/product';

import { BreadcrumbService } from '../../services/breadcrumb.service';
import { ProductsService } from '../../services/products.service';
import { MockDataService } from '../../services/mock-data.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  searchControl = new FormControl('');

  public allProducts: Product[] = [];
  public visibleProducts: Product[] = [];
  public categories: string[] = [];

  // private subscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private mockDataService: MockDataService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.productsService.setPageTitle(this.route);

    this.getPageData();
    this.productsService.setSelectedProduct(null);
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

  public addProduct(): void {
    this.router.navigate(['/detail']);
  }

  public editProduct(product: Product): void {
    this.productsService.setSelectedProduct(product);
    this.router.navigate(['/detail', product.id]);
  }

  public changeCategory(category: MatSelectChange): void {
    if (!category?.value) {
      this.visibleProducts = this.allProducts;
      return;
    }
    this.visibleProducts = this.allProducts.filter(product => product.category === category.value);
  }

  public searchProducts(): void {
    const searchValue: string = this.searchControl.value.toLocaleLowerCase();

    this.visibleProducts = this.allProducts.filter(product =>
      product.name.toLocaleLowerCase().includes(searchValue));
  }

  private getPageData(): void {
    this.mockDataService.getProducts().subscribe(products => {
      this.allProducts = this.visibleProducts = products;
      this.categories = this.productsService.getProductsCategories(this.allProducts);
    })
  }
}
