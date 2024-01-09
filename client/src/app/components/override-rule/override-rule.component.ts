import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IOverrideRule } from '../../interfaces/overrideRule.interface';

@Component({
  selector: 'app-override-rule',
  templateUrl: './override-rule.component.html',
  styleUrl: './override-rule.component.css'
})
export class OverrideRuleComponent implements OnInit, OnChanges {
  
  ngOnInit(): void {
    this.setOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setOptions();
  }

  @Input() selected! : IOverrideRule[];

  possibleOverrides : IOverrideRule[] = [{ title: "Rider distance", ruleType: "rider-arrival-time", maxTime: 0 }, { title: "Customer wait", ruleType: "customer-wait-time", maxTime: 0 }, { title: "Course wait", ruleType: "course-wait-time", maxTime: 0 }];
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

  setOptions () {
    this.selectedOverrides = this.selected;
    this.possibleOverrides = this.possibleOverrides.filter(item => this.selected.findIndex(override => override.ruleType === item.ruleType) === -1);
  }
}
