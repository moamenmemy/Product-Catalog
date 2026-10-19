import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-media-assets',
  imports: [ CommonModule, ReactiveFormsModule, ],
  templateUrl: './media-assets.html',
  styleUrl: './media-assets.scss',
})
export class MediaAssets {
@Input() form!: FormGroup;
  @Input() productImage: string = '';
  @Output() fileSelected = new EventEmitter<any>();

  onFileChange(event: any) {
    this.fileSelected.emit(event);
  }
}
