import { Component, OnInit } from '@angular/core';
import { IBaseRule } from '../../interfaces/baseRule.interface';
import { IOverrideRule } from '../../interfaces/overrideRule.interface';
import { RuleService } from '../../services/rule/rule.service';
import { ApiService } from '../../services/api/api.service';
import { ToastMessageService } from '../../services/toast-message/toast-message.service';

@Component({
  selector: 'app-rule-setter-page',
  templateUrl: './rule-setter-page.component.html',
  styleUrl: './rule-setter-page.component.css'
})
export class RuleSetterPageComponent implements OnInit {

  constructor (private ruleService: RuleService, private api: ApiService, private toast: ToastMessageService) {}

  baseRules : IBaseRule[] = [];
  overrideRules : IOverrideRule[] = [];
  efficiency : boolean = false;
  loading : boolean = false;

  ngOnInit(): void {
    this.baseRules = this.ruleService.rule.baseRules.length ? this.ruleService.rule.baseRules : [];
    this.overrideRules = this.ruleService.rule.overrideRules.length ? this.ruleService.rule.overrideRules : [];
    this.efficiency = this.ruleService.rule.efficiency;

    this.ruleService.ruleEvent.subscribe((rule) => {
      this.baseRules = rule.baseRules;
      this.overrideRules = rule.overrideRules.length ? rule.overrideRules : [];
      this.efficiency = rule.efficiency;
    })
  }


  handleNewBaseRules (rules : IBaseRule[]) {
    this.baseRules = rules;
  }

  handleNewOverrideRules (rules : IOverrideRule[]) {
    this.overrideRules = rules;
  }

  handleEfficiency (value : boolean) {
    this.efficiency = value;
  }

  handleSubmit () {
    this.ruleService.rule = {
      efficiency: this.efficiency,
      baseRules: this.baseRules,
      overrideRules: this.overrideRules
    }

    this.loading = true;
    this.api.setRules(this.ruleService.rule).subscribe({
      next: () => {
        this.loading = false;
        this.toast.setMessage('Saved rules successfully.', "success")
      }
    });
  }


  checkRules () {
    const flag = this.overrideRules.reduce((flag, rule) => rule.maxTime <= 0 ? false : flag, true);
    return flag;
  }
}
