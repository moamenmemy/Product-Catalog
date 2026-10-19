import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BasicInfo } from '../add-product/components/basic-info/basic-info';
import { MediaAssets } from './components/media-assets/media-assets';
import { PricingInventory } from './components/pricing-inventory/pricing-inventory';
import { PublishingSidebar } from './components/publishing-sidebar/publishing-sidebar';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    BasicInfo,
    MediaAssets,
    PricingInventory,
    PublishingSidebar
],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss'
})
export class AddProduct implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  addForm!: FormGroup;
  
  // استخدام الـ Signals للتحكم في حالة الصورة ومعالجة البيانات
  productImage = signal<string>('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500');

  ngOnInit(): void {
    this.addForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      sku: ['SKU-AUTO-9201', Validators.required],
      category: ['Electronics', Validators.required],
      description: [''],
      price: [120, [Validators.required, Validators.min(0)]],
      stock: [150, [Validators.required, Validators.min(0)]],
      status: ['Active'],
      thumbnail: [this.productImage()]
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const result = e.target.result;
        this.productImage.set(result); // تحديث الـ Signal بالصورة الجديدة
        this.addForm.patchValue({ thumbnail: result });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      return;
    }
    this.router.navigate(['/products']);
  }

  onCancel(): void {
    this.router.navigate(['/products']);
  }
}