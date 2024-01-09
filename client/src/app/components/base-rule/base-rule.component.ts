import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IBaseRule } from '../../interfaces/baseRule.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-base-rule',
  templateUrl: './base-rule.component.html',
  styleUrl: './base-rule.component.css'
})
export class BaseRuleComponent implements OnInit, OnChanges {
  ngOnInit(): void {
    this.setOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setOptions();
  }

  @Input() selected! : IBaseRule[];
  @Input() selectedEfficiency! : boolean;

  availableOptions : string[] = ["vip", "delivery", "in-house"];
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
    const selectedBaseRules = this.selectedOptions.map((value, index) => ({ ruleType: value, priority: this.selectedOptions.length - index }));
    const remainingRules = this.availableOptions.map((value) => ({ ruleType: value, priority: 0 }));
    const newBaseRules = [...selectedBaseRules, ...remainingRules];

    this.baseRuleChange.emit(newBaseRules);
  }

  emitEfficiencyChange (event: boolean) {
    this.efficiencyChange.emit(event);
  }

  setOptions () {
    this.selectedOptions = this.selected.filter(item => item.priority > 0).map(item => item.ruleType);
    this.availableOptions = this.selected.length ? this.selected.filter(item => item.priority === 0).map(item => item.ruleType) : ["vip", "delivery", "in-house"];
    this.efficiency = this.selectedEfficiency;
  }

}
