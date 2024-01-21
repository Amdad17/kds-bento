import { IBaseRule } from '../interfaces/baseRule.interface';
import { OrderItemInterface } from '../interfaces/order.interface';
import { IOverrideRule } from '../interfaces/overrideRule.interface';
import { IRules } from '../interfaces/rules.interface';

export function sortOrdersByRules(orders: OrderItemInterface[], rules: IRules) {
  const ordersSortedByBaseRules = sortOrdersByBaseRules(
    orders,
    rules.baseRules
  );
  const ordersSortedByOverrides = sortOrdersByOverrides(
    ordersSortedByBaseRules,
    rules.overrideRules
  );
  return ordersSortedByOverrides;
}

function sortOrdersByBaseRules(
  orders: OrderItemInterface[],
  baseRules: IBaseRule[]
) {
  if (!baseRules.length || baseRules.every((rule) => rule.priority === 0))
    return [...orders];

  const sortedBaseRules = baseRules.sort((a, b) => b.priority - a.priority);

  const newOrders: OrderItemInterface[] = [];
  let oldOrders = [...orders];

  for (const rule of sortedBaseRules) {
    if (rule.priority === 0)
      return [...newOrders, ...applyHiddenRulesForOrder(oldOrders)];

    const filtered: OrderItemInterface[] = [];
    const unfiltered: OrderItemInterface[] = [];

    for (const order of oldOrders) {
      if (rule.ruleType === 'vip')
        (order.vipCustomer ? filtered : unfiltered).push(order);
      else
        (order.type === rule.ruleType ? filtered : unfiltered).push(order);
    }

    newOrders.push(...applyHiddenRulesForOrder(filtered));
    oldOrders = [...unfiltered];
  }

  if (oldOrders.length) newOrders.push(...applyHiddenRulesForOrder(oldOrders));

  return newOrders;
}

function applyHiddenRulesForOrder(orders: OrderItemInterface[]) {
  const urgentOrders: OrderItemInterface[] = [];
  const normalOrders: OrderItemInterface[] = [];

  for (const order of orders) { 
    if (!order.deliveryServiceArriveTime) {
      normalOrders.push(order);
      continue;
    }
    const flag =
      getDeliveryTimeDifferenceInMinutes(order.deliveryServiceArriveTime) <=
      order.items.reduce(
        (totalTime, item) =>
          totalTime + item.item.itemPreparationTime * item.item.itemQuantity,
        0
      );
    (flag ? urgentOrders : normalOrders).push(order);
  }

  const sortedUrgentOrders = urgentOrders.sort((a, b) => {
    const aDiff =
      a.items.reduce(
        (totalTime, item) =>
          totalTime + item.item.itemPreparationTime * item.item.itemQuantity,
        0
      ) - getDeliveryTimeDifferenceInMinutes(a.deliveryServiceArriveTime!);
    const bDiff =
      b.items.reduce(
        (totalTime, item) =>
          totalTime + item.item.itemPreparationTime * item.item.itemQuantity,
        0
      ) - getDeliveryTimeDifferenceInMinutes(b.deliveryServiceArriveTime!);
    return bDiff - aDiff;
  });

  const sortedNormalOrders = [...normalOrders].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return [...sortedUrgentOrders, ...sortedNormalOrders];
}

function sortOrdersByOverrides(
  orders: OrderItemInterface[],
  overrideRules: IOverrideRule[]
) {
  if (!overrideRules.length) return orders;

  const override: OrderItemInterface[] = [];
  const normalOrders: OrderItemInterface[] = [];

  for (const order of orders) {
    const flag = overrideRules.reduce((flag, rule) => {
      if (rule.ruleType === 'rider-arrival-time')
        return !order.deliveryServiceArriveTime
          ? flag
          : getDeliveryTimeDifferenceInMinutes(order.deliveryServiceArriveTime) <= rule.maxTime
          ? true
          : flag;
      if (rule.ruleType === 'customer-wait-time')
        return (new Date().getTime() - new Date(order.createdAt).getTime()) /
          60000 >=
          rule.maxTime
          ? true
          : flag;
      return flag;
    }, false);

    (flag ? override : normalOrders).push(order);
  }

  return [...override, ...normalOrders];
}

function getDeliveryTimeDifferenceInMinutes(deliveryETA: Date) {
  const current = new Date();
  const deliveryETAParsed = new Date(deliveryETA);

  // Calculate the difference in milliseconds
  const timeDifferenceInMilliseconds = deliveryETAParsed.getTime() - current.getTime();

  // Convert milliseconds to minutes
  const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);
  return timeDifferenceInMinutes
}
