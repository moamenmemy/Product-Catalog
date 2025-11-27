import { Injectable, signal } from '@angular/core';
import { Product } from '../interface/product.ts/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
    // Signal لتخزين المنتجات
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);


  // جلب البيانات من Fake Store API
  fetchProducts() {
    this.loading.set(true);
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => this.products.set(data))
      .catch(err => console.error(err))
      .finally(() => this.loading.set(false));
  }

  // جلب منتج واحد حسب ID
  getProductById(id: number) {
    return this.products().find(p => p.id === id);
  }


    updateProduct(updated: Product) {
    this.loading.set(true);
    fetch(`https://fakestoreapi.com/products/${updated.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated)
    })
    .then(res => res.json())
    .then(data => {
      const current = this.products();
      const index = current.findIndex(p => p.id === data.id);
      if (index !== -1) {
        current[index] = data;
        this.products.set([...current]);
      }
    })
    .catch(err => console.error(err))
    .finally(() => this.loading.set(false));
  }
}
