import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Product } from '../../common/models/product';
import { ProductsService } from '../../services/products.service';
import { combineLatest } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  public categories: string[] = [];
  public productForm = this.fb.group({
    name: ['', [Validators.required, Validators.max(30)]],
    count: ['', Validators.required],
    price: ['', Validators.required],
    categories: ['', Validators.required],
    description: ['', Validators.max(512)]
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private productsService: ProductsService,
    private mockDataService: MockDataService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.productsService.setPageTitle(this.route);
    this.getPageData();
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  saveProduct(): void {
    console.log(this.productForm)
  }

  displayFn(category: string | string[]): string {
    return typeof category === 'string' ? category : '';
  }

  private getPageData(): void {
    this.mockDataService.getProducts().subscribe(products => {
      this.categories = this.productsService.getProductsCategories(products);
    })
  }

}
