import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-basic-info',
  imports: [CommonModule, ReactiveFormsModule, SelectModule],
  templateUrl: './basic-info.html',
  styleUrl: './basic-info.scss',
})
export class BasicInfo {
@Input() form!: FormGroup;
categories = [
    { label: 'Electronics', value: 'Electronics' },
    { label: 'Beauty', value: 'Beauty' },
    { label: 'Furniture', value: 'Furniture' }
  ];

  generateSKU() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    this.form.patchValue({ sku: `SKU-AUTO-${randomNum}` });
  }


}
