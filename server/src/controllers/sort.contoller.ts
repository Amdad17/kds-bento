import { Request, Response } from 'express';
import { PermanentRuleModel, RestaurantBaseRuleModel, RuleOverrideModel } from '../model/ruleModel';

class PriorityQueue {
  heap: any[];

  constructor() {
    this.heap = [];
  }

  enqueue(rule: any) {
    this.heap.push(rule);
    this.heapifyUp();
  }

  dequeue() {
    if (this.isEmpty()) {
      return null;
    }

    const root = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }

    return root;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  heapifyUp() {
    let currentIdx = this.heap.length - 1;

    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2);

      if (this.heap[parentIdx].priority > this.heap[currentIdx].priority) {
        this.swap(parentIdx, currentIdx);
        currentIdx = parentIdx;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let currentIdx = 0;
    const length = this.heap.length;

    while (true) {
      const leftChildIdx = 2 * currentIdx + 1;
      const rightChildIdx = 2 * currentIdx + 2;
      let swapIdx = null;

      if (leftChildIdx < length && this.heap[leftChildIdx].priority < this.heap[currentIdx].priority) {
        swapIdx = leftChildIdx;
      }

      if (rightChildIdx < length && this.heap[rightChildIdx].priority < this.heap[currentIdx].priority) {
        if (swapIdx === null || this.heap[rightChildIdx].priority < this.heap[leftChildIdx].priority) {
          swapIdx = rightChildIdx;
        }
      }

      if (swapIdx === null) {
        break;
      }

      this.swap(currentIdx, swapIdx);
      currentIdx = swapIdx;
    }
  }

  swap(i: number, j: number) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }
}

export const saveRule = async (req: Request, res: Response) => {
  try {
    const { permanentRule, restaurantBaseRule, ruleOverride } = req.body;

    const createdPermanentRule = await PermanentRuleModel.create(permanentRule);
    const createdRestaurantBaseRule = await RestaurantBaseRuleModel.create(restaurantBaseRule);
    const createdRuleOverride = await RuleOverrideModel.create(ruleOverride);

    const priorityQueue = new PriorityQueue();
    priorityQueue.enqueue(createdPermanentRule);
    priorityQueue.enqueue(createdRestaurantBaseRule);
    priorityQueue.enqueue(createdRuleOverride);

    return res.status(201).json({
      sortedRules: priorityQueue.heap, 
    });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
