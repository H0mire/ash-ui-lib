import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ash-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() variant: 'default' | 'outlined' | 'elevated' = 'default';
  @Input() padding: 'none' | 'small' | 'medium' | 'large' = 'medium';
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() width: string = 'auto';
  @Input() height: string = 'auto';
  @Input() hasHeader: boolean = false;
  @Input() hasFooter: boolean = false;
  @Input() loading: boolean = false;
  @Input() loadingLines: number = 3;
}
