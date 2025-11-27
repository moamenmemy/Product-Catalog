import { Component, computed, OnInit } from '@angular/core';
import { ProductService } from '../../services/ProductService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  constructor(public productService: ProductService,private router: Router) {}

  // إجمالي عدد المنتجات
  totalProducts = computed(() => this.productService.products().length);

  // أعلى سعر
  highestPrice = computed(() => {
    const items = this.productService.products();
    return items.length ? Math.max(...items.map(p => p.price)) : 0;
  });

  // أقل سعر
  lowestPrice = computed(() => {
    const items = this.productService.products();
    return items.length ? Math.min(...items.map(p => p.price)) : 0;
  });

  // متوسط الأسعار
  avgPrice = computed(() => {
    const items = this.productService.products();
    return items.length
      ? (items.reduce((sum, p) => sum + p.price, 0) / items.length).toFixed(2)
      : 0;
  });

    goToProducts() {
    this.router.navigate(['/products']);
  }

  ngOnInit(): void {
    // لو مفيش بيانات — نجيبها مرة واحدة
    if (this.productService.products().length === 0) {
      this.productService.fetchProducts();
    }
  }
}
