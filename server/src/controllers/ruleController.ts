// import { Request, Response } from 'express';
// import { PermanentRuleModel,RestaurantBaseRuleModel,RuleOverrideModel} from '../model/ruleModel';

// export const saveRule = async (req: Request, res: Response) => {
//   try {

//     const { permanentRule, restaurantBaseRule, ruleOverride } = req.body;
//     const createdPermanentRule = await PermanentRuleModel.create(permanentRule);
//     const createdRestaurantBaseRule = await RestaurantBaseRuleModel.create(restaurantBaseRule);
//     const createdRuleOverride = await RuleOverrideModel.create(ruleOverride);

//     return res.status(201).json({
//        createdPermanentRule,
//        createdRestaurantBaseRule,
//        createdRuleOverride,
//     });
//   } catch (error:any) {
//     return res.status(500).json({ message: error.message });
//   }
// };


import { Request, Response } from 'express';
import Rule from '../model/ruleModel';

export const getRules = async (req: Request, res: Response) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createRule = async (req: Request, res: Response) => {
  try {
    const newRule = req.body;
    const createRule = await Rule.create(newRule);
    res.status(201).json(createRule);
  } catch (error) {
    console.error(error);
    // res.status(500).send(error);
    res.status(500).json({message: 'Error creating rule'});
    
  }
};

// Add additional controller methods for update, delete, etc.
