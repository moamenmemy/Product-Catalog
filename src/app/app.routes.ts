import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Products } from './pages/products/products';
import { ProductDetail } from './pages/product-detail/product-detail';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard').then(m => m.Dashboard),
    title: 'Dashboard'
  },

  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products/products').then(m => m.Products),
    title: 'Products'
  },

{
  path: 'products/:id',
  loadComponent: () =>
    import('./pages/product-detail/product-detail')
      .then(m => m.ProductDetail),
  title: 'Product Detail',
  data: { prerender: false }
},
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login),
    title: 'Product Detail'
  },


    { path: '**', component: NotFound }
];
