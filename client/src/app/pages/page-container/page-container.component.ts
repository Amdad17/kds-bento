import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ApiService } from '../../services/api/api.service';
import { IUser } from '../../interfaces/user.interface';
import { RuleService } from '../../services/rule/rule.service';
import { LoadingService } from '../../services/loading/loading.service';
import { OrdersService } from '../../services/orders/orders.service';
import { SocketService } from '../../services/socket/socket.service';
import { ChefService } from '../../services/chef/chef.service';
import { UtilizationService } from '../../services/utilization/utilization.service';

@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrl: './page-container.component.css'
  
})
export class PageContainerComponent implements OnInit {
  paths = ['dashboard','display','rule-setter'];
  currentPath:string = '/dashboard'

  constructor(
    private route: Router, 
    private api: ApiService,
    private rule: RuleService,
    private ordersService: OrdersService,
    private loadingService: LoadingService,
    private chefService: ChefService,
    private socket: SocketService,
    private utilizationService: UtilizationService
    ){

  }

  user: IUser | undefined;

  ngOnInit(): void {
    this.currentPath = this.route.routerState.snapshot.url;
    this.route.events.subscribe(event => event instanceof NavigationStart ? this.currentPath=event.url : null);
    this.api.getUser().subscribe(data => {
      console.log(data.user);
      this.user = data.user;
      this.socket.connect();
      this.socket.joinRestaurantRoom(data.user.employeeInformation.restaurantId);
    });
    this.fetchRules();
    this.fetchOrders();

    this.api.getActiveChefs().subscribe(res => {
      const chefs = res.data.map(chef => ({ employeeInformation: chef.employee}));
      this.chefService.emitActiveChefs(chefs);
    });

    this.socket.getIncomingOrders().subscribe(data => {
      console.log("Incoming order ==>", data);
      this.ordersService.emitIncomingOrder(data);
    });


    this.socket.getServedOrders().subscribe(data => {
      console.log('Served order:', data);
      this.ordersService.emitServedOrder(data.order);
    });


    this.socket.getChefCheckIn().subscribe(data => this.chefService.checkIn(data.chef));
    this.socket.getChefCheckOut().subscribe(data => this.chefService.checkOut(data.chef));
    this.socket.getRestaurantUtilization().subscribe(data => this.utilizationService.setUtilization(data.utilization));
  }

  fetchOrders () {
    this.loadingService.setOrderLoading(true);
    this.api.getOrders().subscribe(data => {
      console.log("Order data:", data);
      this.ordersService.orders = data.data;
      this.loadingService.setOrderLoading(false);
    });

    this.api.getRestaurantUtilization().subscribe(data => {
      this.utilizationService.setUtilization(data.utilization);
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
