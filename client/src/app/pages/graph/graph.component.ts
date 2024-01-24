
import { Component } from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
 
  public lineChartData1: Array<any> = [
    { data: [1,1,1,2,1,1,4], label: 'Count' },
  ];
  public lineChartLabel1: Array<any> = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00  Pm','2:00 PM','3:00 PM' ];

  public lineChartOptions1:any = {
    responsive: true,
    scales: {
      x: [{
        scaleLabel: {
          display: true,
          labelString: ' Hours'
        }
      }],
      y: [{
        scaleLabel: {
          display: true,
          labelString: 'Count'
        }
      }]
    },
  };

  public lineChartColors: Array<any> = [
    { 
      backgroundColor: 'green',
      borderColor: 'green',
      pointBackgroundColor: 'green',
      pointBorderColor: 'green',
      pointHoverBackgroundColor: 'green',
      pointHoverBorderColor: 'green'
    }
  ];


  public lineChartData2: Array<any> = [
    { data: [80, 70, 60, 75,100,65,75,90,75,95,,], label: 'Chef Efficiency (%)' }
  ];
  public lineChartLabel2: Array<any> = ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM'];

  public lineChartOptions2: any = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Hours'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Chef Efficiency'
        }
      }]
    }
  };


  public lineChartData3: Array<any> = [
    { data: [70,75,65,90,80,85,95], label: 'Count' },
  ];
  public lineChartLabel3: Array<any> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday' ];

  public lineChartOptions3: any = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Count'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Days'
        }
      }]
    }
  };

  public lineChartData4: Array<any> = [
    { data: [70,75,65,90,80,85,95], label: 'Chef Efficiency (%)' },
  ];
  public lineChartLabel4: Array<any> = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday','Friday','Saturday' ];

  public lineChartOptions4: any = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Chef Efficiency'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Days'
        }
      }]
    }
  };

  public lineChartData5: Array<any> = [
    { data: [400,350,650,450,550,650,500,600,700,800,750,850], label: 'Count' },
  ];
  public lineChartLabel5: Array<any> = ['January', 'February', 'March', 'April','May','June','July ' ,'August','September ','October','November ','December '];

  public lineChartOptions5: any = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Count'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }]
    }
  };

  public lineChartData6: Array<any> = [
    { data: [70,75,65,90,80,85,95,60,90,70,85,90], label: 'Chef Efficiency (%)' },
  ];
  public lineChartLabel6: Array<any> = ['January', 'February', 'March', 'April','May','June','July ' ,'August','September ','October','November ','December '];

  public lineChartOptions6: any = {
    responsive: true,
    scales: {
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Chef Efficiency'
        }
      }],
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }]
    }
  };

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
}
