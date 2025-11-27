import { Component, effect, signal } from '@angular/core';
import { Product } from '../../interface/product.ts/product';
import { ProductService } from '../../services/ProductService';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [FormsModule,PaginatorModule,CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
   
  filteredProducts = signal<Product[]>([]);
  pagedProducts = signal<Product[]>([]);
  searchTerm = signal('');
  selectedCategory = signal('All');
  categories = signal<string[]>([]);

  // Pagination
  first = signal(0);
  rows = signal(10);

  constructor(private productService: ProductService, private router: Router) {
   
    this.productService.fetchProducts();

    
    effect(() => {
      const products = this.productService.products();
      const cats = Array.from(new Set(products.map(p => p.category)));
      this.categories.set(['All', ...cats]);
    });

    // تحديث filteredProducts حسب البحث والكاتيجوري
    effect(() => {
      const term = this.searchTerm().toLowerCase();
      const category = this.selectedCategory();

      this.filteredProducts.set(
        this.productService.products().filter(p => {
          const matchesTerm = p.title.toLowerCase().includes(term);
          const matchesCategory = category === 'All' || p.category === category;
          return matchesTerm && matchesCategory;
        })
      );

      
      this.updatePagedProducts();
    });

    
    effect(() => {
      this.updatePagedProducts();
    });
  }

  
  updatePagedProducts() {
    const start = this.first();
    const end = start + this.rows();
    this.pagedProducts.set(this.filteredProducts().slice(start, end));
  }

  onPageChange(event: any) {
    this.first.set(event.first);
    this.rows.set(event.rows);
  }

  
  goToDetail(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/products', id]);
    }
  }
}