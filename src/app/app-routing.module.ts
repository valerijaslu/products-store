import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContainerComponent } from './main/pages/main-container/main-container.component';
import { ProductsComponent } from './main/pages/products/products.component';
import { ProductDetailsComponent } from './main/pages/product-details/product-details.component';

const routes: Routes = [
  {
    path: '',
    component: MainContainerComponent,
    children: [{
      path: 'products',
      component: ProductsComponent,
      data: {
        title: $localize`:@@productTitle:Products`
      }
    }, {
      path: 'detail/:id',
      component: ProductDetailsComponent,
      data: {
        title: $localize`:@@editTitle:Edit Product`

      }
    }, {
      path: 'detail',
      component: ProductDetailsComponent,
      data: {
        title: $localize`:@@newTitle:New Product`
      }
    }, {
      path: '',
      redirectTo: 'products',
      pathMatch: 'full'
    }, {
      path: '**',
      redirectTo: 'products'
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
