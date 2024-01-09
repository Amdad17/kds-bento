import express from 'express';
import { getRulesForRestaurant, setRulesRestaurant } from '../controllers/rules.contoller';

const Rulerouter = express.Router();
Rulerouter.post('/add', setRulesRestaurant);
Rulerouter.get('/get', getRulesForRestaurant);
export default  Rulerouter;

