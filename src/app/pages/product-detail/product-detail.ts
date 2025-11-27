import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../interface/product.ts/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/ProductService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  imports: [FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  product = signal<Product | null>(null);
  editMode = signal(false); // حالة التعديل

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!isNaN(id)) {
      const found = this.productService.products().find(p => p.id === id);
      if (found) {
        this.product.set({...found}); // clone لتجنب تعديل مباشر
      } else {
        this.router.navigate(['/products']);
      }
    }
  }

  toggleEdit() {
    this.editMode.set(!this.editMode());
  }

  saveChanges() {
    if (this.product()) {
      this.productService.updateProduct(this.product()!);
      this.editMode.set(false);
    }
  }

   updateImage(newUrl: string) {
    if (this.product()) {
      this.product()!.image = newUrl;
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
