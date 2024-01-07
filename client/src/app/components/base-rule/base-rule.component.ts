import { Component, EventEmitter, Output } from '@angular/core';
import { IBaseRule } from '../../interfaces/baseRule.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-base-rule',
  templateUrl: './base-rule.component.html',
  styleUrl: './base-rule.component.css'
})
export class BaseRuleComponent {

  availableOptions : string[] = ["VIP", "Delivery", "In-House"];
  selectedOptions : string[] = [];
  efficiency : boolean = false;

  @Output() baseRuleChange = new EventEmitter<IBaseRule[]>();
  @Output() efficiencyChange = new EventEmitter<boolean>();

  drop(event: CdkDragDrop<string[]>) {
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

    this.emitNewBaseRules();
  }

  emitNewBaseRules () {
    const selectedBaseRules = this.selectedOptions.map((value, index) => ({ type: value.toLocaleLowerCase(), priority: this.selectedOptions.length - index }));
    const remainingRules = this.availableOptions.map((value) => ({ type: value.toLocaleLowerCase(), priority: 0 }));
    const newBaseRules = [...selectedBaseRules, ...remainingRules];

    this.baseRuleChange.emit(newBaseRules);
  }

  emitEfficiencyChange (event: boolean) {
    this.efficiencyChange.emit(event);
  }

}
