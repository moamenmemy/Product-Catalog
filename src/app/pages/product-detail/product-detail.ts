import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../interface/product.ts/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/ProductService';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
    standalone: true,
  imports: [FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  product = signal<Product | null>(null);
  editMode = signal(false); 
isZoomed = signal(false);
  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    private router: Router
  ) {}


toggleZoom() {
    this.isZoomed.set(!this.isZoomed());
  }

  ngOnInit() {
    // مراقبة تغيير الـ Route لكي يتم تحديث المنتج حتى لو تم الضغط على منتج مرتبط آخر
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (!isNaN(id)) {
        const found = this.productService.products().find(p => p.id === id);
        if (found) {
          this.product.set({...found}); 
        } else {
          this.router.navigate(['/products']);
        }
      }
    });
  }

  
toggleEdit() {
    const currentProduct = this.product();
    if (currentProduct && currentProduct.id !== undefined) {
      // توجيه المستخدم إلى مسار التعديل المعرّف لديك: /products/:id/edit
      this.router.navigate(['/products', currentProduct.id, 'edit']);
    }
  }
  

  saveChanges() {
    if (this.product()) {
      this.productService.updateProduct(this.product()!);
      this.editMode.set(false);
    }
  }

  goToDetail(id: number | undefined) {
    if (id !== undefined) {
      this.router.navigate(['/products', id]);
    }
  }

  getRelatedProducts() {
    const allProducts = this.productService.products();
    const currentProduct = this.product();
    
    if (!currentProduct) return [];

    return allProducts
      .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
      .slice(0, 4);
  }

  updateImage(newUrl: string) {
    if (this.product()) {
      this.product()!.thumbnail = newUrl;
    }
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
