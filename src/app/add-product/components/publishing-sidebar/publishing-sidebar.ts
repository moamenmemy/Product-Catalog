import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-publishing-sidebar',
  imports: [CommonModule, 
    ReactiveFormsModule],
  templateUrl: './publishing-sidebar.html',
  styleUrl: './publishing-sidebar.scss',
})
export class PublishingSidebar {
@Input() form!: FormGroup;

  get calculatedProfit(): number {
    const price = this.form.get('price')?.value || 0;
    const cost = this.form.get('cost')?.value || 0;
    return price - cost;
  }

  get calculatedMargin(): number {
    const price = this.form.get('price')?.value || 0;
    if (price === 0) return 0;
    return Number(((this.calculatedProfit / price) * 100).toFixed(1));
  }
}
