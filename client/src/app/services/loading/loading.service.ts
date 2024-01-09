import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor() { }

  dashboardLoading : boolean = false;
  orderLoading : boolean = false;
  ruleLoading : boolean = false;

  dashboardLoadingEvent = new Subject<boolean>();
  orderLoadingEvent = new Subject<boolean>();
  ruleLoadingEvent = new Subject<boolean>();

  setDashboardLoading (state: boolean) {
    this.dashboardLoadingEvent.next(state);
    this.dashboardLoading = state;
  }

  setOrderLoading (state: boolean) {
    this.orderLoadingEvent.next(state);
    this.orderLoading = state;
  }

  setRuleLoading (state: boolean) {
    this.ruleLoadingEvent.next(state);
    this.ruleLoading = state;
  }
}
