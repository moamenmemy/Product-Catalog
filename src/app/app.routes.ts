import { Routes } from '@angular/router';


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

  // ⚡ 1. ارفع مسار الإضافة هنا في الأعلى تماماً قبل الـ :id
  {
    path: 'products/add',
    loadComponent: () =>
      import('./add-product/add-product').then(m => m.AddProduct),
    title: 'Add New Product',
    data: { prerender: false }
  },

  // ⚡ 2. مسار التعديل
  {
    path: 'products/:id/edit',
    loadComponent: () => import('./pages/edit-product/edit-product').then(m => m.EditProduct),
    title: 'Edit Product',
    data: { prerender: false } 
  },

  // ⚡ 3. مسار التفاصيل يأتي بعدهم لكي لا يختطف كلمة add
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then(m => m.ProductDetail),
    title: 'Product Detail',
    data: { prerender: false }  
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.Login),
    title: 'Login'
  },

  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found').then(m => m.NotFound)
  }
];
