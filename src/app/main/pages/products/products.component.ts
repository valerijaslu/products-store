import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { filter, first } from 'rxjs/operators';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../common/models/product';
import { MockDataService } from '../../services/mock-data.service';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  searchControl = new FormControl('');

  public allProducts: Product[] = [];
  public visibleProducts: Product[] = [];
  public categories: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private mockDataService: MockDataService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.setPageTitle();

    this.getPageData();
    this.productsService.setSelectedProduct(null);
  }

  public addProduct(): void {
    this.router.navigate(['/product-details']);
  }

  public editProduct(product: Product): void {
    this.productsService.setSelectedProduct(product);
    this.router.navigate(['/product-details']);
  }

  public changeCategory(category: MatSelectChange): void {
    this.visibleProducts = this.allProducts.filter(product => product.category === category.value)
  }

  public searchProducts(): void {
    const searchValue: string = this.searchControl.value.toLocaleLowerCase();

    this.visibleProducts = this.allProducts.filter(product =>
      product.name.toLocaleLowerCase().includes(searchValue));
  }

  private setPageTitle(): void {
    this.route.data.pipe(
      filter(res => !!res && !!Object.keys(res).length),
      first()
    ).subscribe((routerData) => {
      this.breadcrumbService.setTitle(routerData.title);
    });
  }

  private getPageData(): void {
    this.mockDataService.getProducts().subscribe(products => {
      console.log(products)
      this.allProducts = this.visibleProducts = products;
      this.categories = this.productsService.getProductsCategories(this.allProducts);
    })
  }
}
