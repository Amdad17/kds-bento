import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-override-option-card',
  templateUrl: './override-option-card.component.html',
  styleUrl: './override-option-card.component.css'
})
export class OverrideOptionCardComponent {
  @Input() option!: { title: string, maxTime: number };
  @Input() showInput?: boolean;

  getIcon() {
    if (this.option.title.toLocaleLowerCase().includes('rider')) return '../../../assets/svg/helmet.svg';
    if (this.option.title.toLocaleLowerCase().includes('customer')) return '../../../assets/svg/table-and-chairs.svg';
    return '../../../assets/svg/plate.svg';
  }
}
