import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component'
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { LoginfailComponent } from './loginfail/loginfail.component';
import { ProductsComponent } from './products/products.component';
import { NewProductComponent } from './new-product/new-product.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'products/range/:min/:max',
    component: ProductsComponent
  },
  {
    path: 'products/category/:category',
    component: ProductsComponent
  },
  {
    path: 'products/word/:keyword',
    component: ProductsComponent
  },
  {
    path: 'products/category_range/:category/:min/:max',
    component: ProductsComponent
  },
  {
    path: 'products/word+category+range/:keyword/:category/:min/:max',
    component: ProductsComponent
  },
  {
    path: 'products/word+range/:keyword/:min/:max',
    component: ProductsComponent
  },
  {
    path: 'products/word+category/:keyword/:category',
    component: ProductsComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path:'loginfail',
    component: LoginfailComponent
  },
  {
    path:'new-product',
    component: NewProductComponent
  },
  {
    path: 'cart',
    component: OrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
