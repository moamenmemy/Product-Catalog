import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SelectModule } from 'primeng/select';
import { ProductService } from '../../services/ProductService';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, SelectModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.scss',
})
export class EditProduct implements OnInit {
  
private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productService = inject(ProductService);

  editForm!: FormGroup;
  productId!: number;
lifecycleOptions = [
    { label: 'Active in Catalog (Live)', value: 'Active' },
    { label: 'Draft', value: 'Draft' },
    { label: 'Archived', value: 'Archived' }
  ];

  ngOnInit(): void {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      description: [''],
      status: ['Active']
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.productId = +idParam;

      const existingProduct = this.productService.getProductById(this.productId);
      
      if (existingProduct) {
        this.patchFormValues(existingProduct);
      } else {
        this.productService.getProductFromServer(this.productId).then((product: any) => {
          this.patchFormValues(product);
        }).catch((err: any) => console.error(err));
      }
    }
  }

 productImage: string = '';

// داخل دالة patchFormValues أو عند جلب المنتج:
private patchFormValues(product: any) {
  this.editForm.patchValue({
    title: product.title,
    price: product.price,
    stock: product.stock,
    category: product.category,
    description: product.description
  });
  
  // تعيين الصورة القديمة القادمة من المنتج (DummyJSON يوفر property اسمها thumbnail أو images)
  this.productImage = product.thumbnail || product.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60';
}
onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    // استخدام FileReader لعرض معاينة الصورة محلياً
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.productImage = e.target.result; // تحديث الصورة المعروضة فورا للصورة الجديدة
    };
    reader.readAsDataURL(file);
    
    // يمكنك هنا تخزين الfile لو حبيت ترسله مع الـ Form للـ API لاحقاً
  }
}
  onSubmit(): void {
    if (this.editForm.invalid) return;

    const updatedData = {
      id: this.productId,
      ...this.editForm.value
    };

    

    this.productService.updateProduct(updatedData);
    this.router.navigate(['/products']);
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.productId);
      this.router.navigate(['/products']);
    }
  }

  // دالة الإلغاء
  onCancel(): void {
    this.router.navigate(['/products']);
  }
}
