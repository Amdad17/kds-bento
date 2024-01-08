import { Injectable } from '@angular/core';
import { IRules } from '../../interfaces/rules.interface';

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
}
