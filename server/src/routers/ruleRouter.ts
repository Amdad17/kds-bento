import express from 'express';
import {
  createRules,
  findRulesForRestaurant,
  updateExistingRules,
  deleteRulesForRestaurant,
  deleteRulesById,
} from '../controllers/rules.contoller';

const Rulerouter = express.Router();


Rulerouter.post('/rules', createRules);

Rulerouter.get('/rules/:restaurantId', findRulesForRestaurant);

Rulerouter.put('/rules/:ruleId', updateExistingRules);

Rulerouter.delete('/rules/:restaurantId', deleteRulesForRestaurant);

Rulerouter.delete('/rules/:ruleId', deleteRulesById);

export default  Rulerouter;

