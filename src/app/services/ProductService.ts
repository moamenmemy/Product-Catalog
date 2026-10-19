import { Injectable, signal } from '@angular/core';
import { Product } from '../interface/product.ts/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
// جلب تفاصيل منتج واحد مباشرة من الـ API
  getProductFromServer(id: number) {
    return fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json());
  }
  // Signal لتخزين المنتجات
  products = signal<Product[]>([]);
  loading = signal<boolean>(false);

  // جلب البيانات من DummyJSON بدلاً من FakeStoreAPI لتجنب مشاكل CORS
  fetchProducts() {
    this.loading.set(true);
    fetch('https://dummyjson.com/products')
      .then(res => res.json())
      .then(data => {
        // DummyJSON يعيد البيانات داخل مفتاح products (يعني data.products)
        this.products.set(data.products);
      })
      .catch(err => console.error(err))
      .finally(() => this.loading.set(false));
  }

  // جلب منتج واحد حسب ID
  getProductById(id: number) {
    return this.products().find(p => p.id === id);
  }

  updateProduct(updated: Product) {
    this.loading.set(true);
    fetch(`https://dummyjson.com/products/${updated.id}`, {
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

  // حذف منتج حسب ID
  deleteProduct(id: number) {
    this.loading.set(true);
    fetch(`https://dummyjson.com/products/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(() => {
        const current = this.products();
        const updatedProducts = current.filter(p => p.id !== id);
        this.products.set(updatedProducts);
      })
      .catch(err => console.error(err))
      .finally(() => this.loading.set(false));
  }
}