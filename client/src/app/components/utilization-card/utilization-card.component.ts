import { Component, Input, OnInit } from '@angular/core';
import { UtilizationService } from '../../services/utilization/utilization.service';

@Component({
  selector: 'app-utilization-card',
  templateUrl: './utilization-card.component.html',
  styleUrl: './utilization-card.component.css'
})
export class UtilizationCardComponent implements OnInit {

  constructor (private utilizationService: UtilizationService) {}

  utilization: number = 0;

  ngOnInit(): void {
    this.utilization = this.utilizationService.utilization;
    this.utilizationService.newUtilizationEvent.subscribe(data => this.utilization = data);
  }

  format (percent: number) {
    return `${percent}%`
  }
}
