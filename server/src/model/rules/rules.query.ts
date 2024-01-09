import { Types } from 'mongoose';
import { IRules } from "../../interfaces/rules.interface";
import Rules from "./rules.model";

export async function createRules (data: IRules) {
  try {
    const newRules = await Rules.create(data);
    return newRules;
  } catch (error) {
    console.log(error);
    throw new Error('Error in creating rules for restaurant.');
  }
}


export async function findRulesForRestaurant (restaurantId: number) {
  try {
    const rules = await Rules.findOne({ restaurantId });
    return rules;
  } catch (error) {
    console.log(error);
    throw new Error('Error in finding rules for restaurant.');
  }
}


export async function updateExistingRules (ruleId: string | Types.ObjectId, data: IRules) {
  try {
    const updatedRules = await Rules.findByIdAndUpdate(ruleId, { $set: data }, { new: true });
    return updatedRules;
  } catch (error) {
    console.log(error);
    throw new Error('Error in updating exisitng rules for restaurant.');
  }
}


export async function deleteRulesForRestaurant (restaurantId: string) {
  try {
    const deletedRules = await Rules.findOneAndDelete({ restaurantId });
    return deletedRules;
  } catch (error) {
    console.log(error);
    throw new Error('Error in deleting rules for restaurant.');
  }
}


export async function deleteRulesById (ruleId: string | Types.ObjectId) {
  try {
    const deletedRules = await Rules.findByIdAndDelete(ruleId);
    return deletedRules;
  } catch (error) {
    console.log(error);
    throw new Error('Error in deleting rules for restaurant.');
  }
}