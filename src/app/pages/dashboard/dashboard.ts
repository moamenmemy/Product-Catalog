import { Component, computed, OnInit } from '@angular/core';
import { ProductService } from '../../services/ProductService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
    standalone: true,
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {

  constructor(public productService: ProductService,private router: Router) {}

  
  totalProducts = computed(() => this.productService.products().length);


  highestPrice = computed(() => {
    const items = this.productService.products();
    return items.length ? Math.max(...items.map(p => p.price)) : 0;
  });


  lowestPrice = computed(() => {
    const items = this.productService.products();
    return items.length ? Math.min(...items.map(p => p.price)) : 0;
  });

 
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
    
    if (this.productService.products().length === 0) {
      this.productService.fetchProducts();
    }
  }
}
