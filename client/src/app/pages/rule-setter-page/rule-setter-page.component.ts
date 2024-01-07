import { Component } from '@angular/core';
import { IRules } from '../../interfaces/rules.interface';
import { IBaseRule } from '../../interfaces/baseRule.interface';
import { IOverrideRule } from '../../interfaces/overrideRule.interface';

@Component({
  selector: 'app-rule-setter-page',
  templateUrl: './rule-setter-page.component.html',
  styleUrl: './rule-setter-page.component.css'
})
export class RuleSetterPageComponent {
  rules : IRules = {efficiency: false, baseRules: [], overrideRules: []};
  baseRules : IBaseRule[] = this.rules.baseRules;
  overrideRules : IOverrideRule[] = this.rules.overrideRules;
  efficiency : boolean = this.rules.efficiency;

  handleNewBaseRules (rules : IBaseRule[]) {
    this.baseRules = rules;
  }

  handleNewOverrideRules (rules : IOverrideRule[]) {
    this.overrideRules = rules;
  }

  handleEfficiency (value : boolean) {
    this.efficiency = value;
  }


  checkRules () {
    const flag = this.overrideRules.reduce((flag, rule) => rule.maxTime <= 0 ? false : flag, true);
    return flag;
  }
}
