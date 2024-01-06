import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  onButtonClicked(buttonNumber: number): void {
    console.log(`Button ${buttonNumber} clicked!`);

  }

}
