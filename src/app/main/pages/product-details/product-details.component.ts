import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, first } from 'rxjs/operators';
import { BreadcrumbService } from '../../services/breadcrumb.service';
import { Product } from '../../common/models/product';
import { ProductsService } from '../../services/products.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    combineLatest([this.route.data, this.productsService.getSelectedProduct$]).pipe(
      filter(([routeData]) => !!Object.keys(routeData).length),
      first()
    ).subscribe(([routerData, selectedProduct]) => {
      if (selectedProduct) {
        this.breadcrumbService.setTitle(routerData.editTitle);
      } else {
        this.breadcrumbService.setTitle(routerData.title);
      }

    });
  }

}
