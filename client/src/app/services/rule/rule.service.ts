import { Injectable } from '@angular/core';
import { IRules } from '../../interfaces/rules.interface';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RuleService {

  constructor() { }

  rule: IRules = {
    efficiency: false,
    baseRules: [],
    overrideRules: []
  }

  ruleEvent = new Subject<IRules>();

  setRule (rule: IRules) {
    this.ruleEvent.next(rule);
    this.rule = rule;
  }
}
