import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';
import { IOverrideRule } from '../../interfaces/overrideRule.interface';

@Component({
  selector: 'app-override-rule',
  templateUrl: './override-rule.component.html',
  styleUrl: './override-rule.component.css'
})
export class OverrideRuleComponent {
  possibleOverrides : IOverrideRule[] = [{ title: "Rider distance", type: "rider-arrival-time", maxTime: 0 }, { title: "Customer wait", type: "customer-wait-time", maxTime: 0 }, { title: "Course wait", type: "course-wait-time", maxTime: 0 }];
  selectedOverrides : IOverrideRule[] = [];

  @Output() newOverrideRules = new EventEmitter<IOverrideRule[]>();

  drop(event: CdkDragDrop<IOverrideRule[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    this.emitNewOverrideRules();
  }

  emitNewOverrideRules () {
    this.newOverrideRules.emit(this.selectedOverrides);
  }
}
