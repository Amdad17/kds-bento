import { PermanentRuleModel, RestaurantBaseRuleModel, RuleOverrideModel } from './ruleModel';

export const createPermanentRule = async (data:any) => {
  return await PermanentRuleModel.create(data);
};

export const createRestaurantBaseRule = async (data:any) => {
  return await RestaurantBaseRuleModel.create(data);
};

export const createRuleOverride = async (data:any) => {
  return await RuleOverrideModel.create(data);
};


