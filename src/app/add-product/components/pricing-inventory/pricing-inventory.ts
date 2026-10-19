import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pricing-inventory',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pricing-inventory.html',
  styleUrl: './pricing-inventory.scss',
})
export class PricingInventory {
@Input() form!: FormGroup;
}
