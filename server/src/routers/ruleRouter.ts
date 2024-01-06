import express from 'express';
import { createRule, getRules } from '../controllers/ruleController'

const rulerouter = express.Router();

rulerouter.post('/create',createRule);
rulerouter.get('/get',getRules);

export default rulerouter;
