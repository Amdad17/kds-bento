import { Component, OnInit } from '@angular/core';
import { IBaseRule } from '../../interfaces/baseRule.interface';
import { IOverrideRule } from '../../interfaces/overrideRule.interface';
import { RuleService } from '../../services/rule/rule.service';
import { ApiService } from '../../services/api/api.service';
import { ToastMessageService } from '../../services/toast-message/toast-message.service';
import { IRules } from '../../interfaces/rules.interface';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-rule-setter-page',
  templateUrl: './rule-setter-page.component.html',
  styleUrl: './rule-setter-page.component.css'
})
export class RuleSetterPageComponent implements OnInit {

  constructor (
    private ruleService: RuleService, 
    private api: ApiService, 
    private toast: ToastMessageService,
    private loadingService: LoadingService
    ) {}

  baseRules : IBaseRule[] = [];
  overrideRules : IOverrideRule[] = [];
  efficiency : boolean = false;
  loading : boolean = false;
  pageLoading: boolean = false;

  ngOnInit(): void {
    this.pageLoading = this.loadingService.ruleLoading;
    this.setSelectedRules(this.ruleService.rule);
    this.ruleService.ruleEvent.subscribe((rule) => this.setSelectedRules(rule));
    this.loadingService.ruleLoadingEvent.subscribe(value => this.pageLoading = value);
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

  setSelectedRules (rules: IRules) {
    this.baseRules = rules.baseRules.length ? rules.baseRules : [];
    this.overrideRules = rules.overrideRules.length ? rules.overrideRules : [];
    this.efficiency = rules.efficiency;
  }

  checkRules () {
    const flag = this.overrideRules.reduce((flag, rule) => rule.maxTime <= 0 ? false : flag, true);
    return flag;
  }
}