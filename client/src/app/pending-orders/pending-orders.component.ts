import { Component } from '@angular/core';

// @Component({
//   selector: 'app-pending-orders',
//   templateUrl: './pending-orders.component.html',
//   styleUrl: './pending-orders.component.css'
// })
// export class PendingOrdersComponent {

// }
// pending-orders.component.ts
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

export class PendingOrdersComponent {
  pendingOrders = [
    // Initialize with your orders data
  ];

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.pendingOrders, event.previousIndex, event.currentIndex);
    } else {
      // Logic to handle moving items between different containers
    }
  }
}
