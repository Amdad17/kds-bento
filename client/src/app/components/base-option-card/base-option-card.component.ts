import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-base-option-card',
  templateUrl: './base-option-card.component.html',
  styleUrl: './base-option-card.component.css'
})
export class BaseOptionCardComponent {
  @Input() title!: string;
  @Input() index?: string;

  getIcon () {
    switch (this.title) {
      case "vip":
        return '../../../assets/svg/vip-gem.svg';
      case "delivery":
        return '../../../assets/svg/scooter.svg';
      default:
        return '../../../assets/svg/food-tray.svg';
    }
  }

  getListIndex () {
    return this.index ? Number(this.index) + 1 : null;
  }

  getDisplayTitle () {
    switch (this.title) {
      case "vip":
        return "VIP"
      default:
        return this.title.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("-");
    }
  }
}
