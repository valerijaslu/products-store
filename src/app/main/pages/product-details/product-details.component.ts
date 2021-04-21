import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators } from '@angular/forms';

import { filter, first, switchMap, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { BreadcrumbService } from '../../services/breadcrumb.service';
import { ProductsService } from '../../services/products.service';
import { MockDataService } from '../../services/mock-data.service';
import { Localize } from '../../common/utils/localize';
import { Product, UrlType } from '../../common/models/product';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  public isEditMode: boolean = false;
  public editProductId: string | null = null;
  public categories: string[] = [];
  public url: UrlType = null;

  public productForm = this.fb.group({
    url: [null],
    name: ['', [Validators.required, Validators.maxLength(30)]],
    count: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.maxLength(512)]
  });

  private readonly destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private breadcrumbService: BreadcrumbService,
    private productsService: ProductsService,
    private mockDataService: MockDataService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productsService.setPageTitle(this.route);
    this.getCategories();
    this.getPageData()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

  saveProduct(): void {
    if(this.productForm.invalid) {
      return;
    }

    if (!this.isEditMode) {
      this.mockDataService.addProduct(this.productForm.value).pipe(
        filter(res => !!res),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        const addProductMessage = $localize `:@@product.details.add.message: Your product has been successfully added!`;
        this.snackBar.open(addProductMessage, Localize.OkAction, {
          duration: 3000
        })
      });
      return;
    }

    this.mockDataService.editProduct({id: this.editProductId, ...this.productForm.value}).pipe(
      filter(res => !!res),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const editProductMessage = $localize `:@@product.details.edit.message: Your product has been successfully updated!`;
      this.snackBar.open(editProductMessage, Localize.OkAction, {
        duration: 3000
      })
    })
  }

  displayFn(category: string | string[]): string {
    return typeof category === 'string' ? category : '';
  }

  onFileChanged(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.fileReader(file);

    this.mockDataService.fileUpload(file).pipe(
      filter(res => !!res),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      const fileUploadMessage = $localize `:@@product.details.file-upload.message: Image uploaded successfully!`;
      this.snackBar.open(fileUploadMessage, Localize.OkAction, {
        duration: 3000
      });
    });
  }

  private fileReader(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const url: UrlType = event.target?.result;
      this.productForm.controls['url'].patchValue(url);
    }
  }

  private getCategories(): void {
    this.mockDataService.getProducts().pipe(
      takeUntil(this.destroy$)
    ).subscribe(products => {
      this.categories = this.productsService.getProductsCategories(products);
    })
  }

  private getPageData(): void {
    this.route.params.pipe(
      filter(params => !!params?.id),
      first(),
      switchMap(params => {
        this.editProductId = params.id.toString();
        return this.mockDataService.getProductById(params.id)
      }),
      takeUntil(this.destroy$)
    ).subscribe(editedProduct => {
      if (editedProduct) {
        this.initProductForm(editedProduct);
        this.isEditMode = true;
      }
    });
  }

  private initProductForm(editedProduct: Product): void {
    const {id, ...editedProductFormData} = editedProduct;
    this.productForm.setValue(editedProductFormData)
  }
}
