import { IBaseRule } from "./baseRule.interface";
import { IOverrideRule } from "./overrideRule.interface";

export interface IRules {
  efficiency: boolean,
  baseRules: IBaseRule[],
  overrideRules: IOverrideRule[]
}