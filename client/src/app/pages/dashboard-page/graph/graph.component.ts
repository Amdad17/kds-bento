import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {



  @Input() chartData: any[] = [];
  @Input() chartLabels: string[] = [];
  @Input() chartOptions: any = {};
  
  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    
  ];

  public barChartLabels: string[] = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label 6', 'Label 7'];

  public barChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
   

  
}


}