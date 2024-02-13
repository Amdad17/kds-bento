import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilizationService {

  constructor() { }

  utilization: number = 0;
  newUtilizationEvent = new Subject<number>();
  
  setUtilization (utilization: number) {
    this.utilization = utilization;
    this.newUtilizationEvent.next(utilization);
  }
}
