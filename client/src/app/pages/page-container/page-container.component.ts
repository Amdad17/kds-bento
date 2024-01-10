import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { IUser } from '../../interfaces/user.interface';
import { RuleService } from '../../services/rule/rule.service';
import { LoadingService } from '../../services/loading/loading.service';
import { OrdersService } from '../../services/orders/orders.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.css'
  
})
export class PageContainerComponent implements OnInit {
  paths = ['dashboard','display','rule-setter'];
  currentPath:string = '/dashboard'

  constructor(
    private route:Router, 
    private api: ApiService,
    private rule: RuleService,
    private ordersService: OrdersService,
    private loadingService: LoadingService,
    private socket: Socket
    ){

  }

  user: IUser | undefined;

  ngOnInit(): void {
    this.currentPath = this.route.routerState.snapshot.url;
    this.route.events.subscribe(event => event instanceof NavigationStart ? this.currentPath=event.url : null);
    this.api.getUser().subscribe(data => {
      this.user = data.user;
      this.socket.connect();
      this.socket.emit('join', { restaurantId: data.user.employeeInformation.restaurantId});
    });
    this.fetchRules();
    this.fetchOrders();
  }

  fetchOrders () {
    this.loadingService.setOrderLoading(true);
    this.api.getOrders().subscribe(data => {
      this.ordersService.orders = data;
      this.loadingService.setOrderLoading(false);
    })
  }

  fetchRules () {
    this.loadingService.setRuleLoading(true);
    this.api.getRules().subscribe(data => {
      this.loadingService.setRuleLoading(false);
      if (data) {
        const { baseRules, overrideRules, efficiency } = data;
        this.rule.setRule({ baseRules, overrideRules, efficiency });
      }
    }); 
  }

  parseName (path: string) {
    return path.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
  }
  isSelected (path: string) {
    return this.currentPath.slice(1) === path
  }


}
