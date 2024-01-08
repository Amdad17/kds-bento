import express from 'express';
import { getRulesForRestaurant, setRulesRestaurant } from '../controllers/rules.contoller';

const Rulerouter = express.Router();
Rulerouter.post('/rules/:restaurantId', setRulesRestaurant);
Rulerouter.get('/rules/:restaurantId', getRulesForRestaurant);
export default  Rulerouter;

