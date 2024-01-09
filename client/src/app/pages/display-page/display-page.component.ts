
import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
export interface Order {
  id: number;
  customerName: string;
  orderDetails: string;
  chefName: string;
  status: string;
  dragging?: boolean;
}

@Component({
  selector: 'app-display-page',
  templateUrl: './display-page.component.html',
  styleUrls: ['./display-page.component.css']
})
export class DisplayPageComponent implements OnInit {

  pending: Order[] = [];
  BeingPreparing: Order[] = [];
  ReadyToServe: Order[] = [];
  ServedDelivered: Order[] = [];

  constructor() {}

  ngOnInit(): void {
    this.pending = [
      { id: 1, customerName: 'John Doe', orderDetails: '2 x Beef Burger, Add: 1 extra cheese, No: Pickles', chefName: 'Chef A', status: 'Pending' },
      { id: 2, customerName: 'Jane Doe', orderDetails: '1 x Chicken Sandwich, Add: Tomato, No: Mayo', chefName: 'Chef B', status: 'Pending' },
    ];
    this.BeingPreparing = [];
    this.ReadyToServe = [];
    this.ServedDelivered = [];
  }

  onDrop(event: CdkDragDrop<Order[]>, targetList: string) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      
      event.container.data[event.currentIndex].status = this.getNewStatus(targetList);
    }
  }

  getNewStatus(targetList: string): string {
    switch (targetList) {
      case 'BeingPreparing':
        return 'Preparing';
      case 'ReadyToServe':
        return 'Ready';
      case 'ServedDelivered':
        return 'Delivered';
      default:
        return 'Pending';
    }
  }
}