/**
 * Time-Complexity:  O(n*log(n))
 *
 * @param {Array} array the Initialization array
 * @class
 */
module.exports = class SegmentTree {
  constructor(array) {
    this.array = array;
    this.heap = [];
    this.build(1, 0, array.length);
  }
  size() {
    return this.array.length;
  }
  build(index, from, size) {
    this.heap[index] = new SegmentTreeNode();
    this.heap[index].from = from;
    this.heap[index].to = from + size - 1;
    if (size === 1) {
      this.heap[index].sum = this.array[from];
      this.heap[index].min = this.array[from];
    } else {
      this.build(2 * index, from, (size / 2) | 0);
      this.build(2 * index + 1, from + ((size / 2) | 0), size - ((size / 2) | 0));
      this.heap[index].sum = this.heap[2 * index].sum + this.heap[2 * index + 1].sum;
      this.heap[index].min = Math.min(this.heap[2 * index].min, this.heap[2 * index + 1].min);
    }
  }
  rangeSumQuery(index = 1, from, to) {
    const node = this.heap[index];

    // If you did a range update that contained this node, you can infer
    // the Sum without going down the tree
    if (node.pendingVal != null && contains(node.from, node.to, from, to)) {
      return (to - from + 1) * node.pendingVal;
    }

    if (contains(from, to, node.from, node.to)) {
      return this.heap[index].sum;
    }

    if (SegmentTree.intersects(from, to, node.from, node.to)) {
      this.propagate(index);
      const leftSum = this.rangeSumQuery(2 * index, from, to);
      const rightSum = this.rangeSumQuery(2 * index + 1, from, to);
      return leftSum + rightSum;
    }

    return 0;
  }
  rangeMinQuery(index = 1, from, to) {
    const node = this.heap[index];

    //If you did a range update that contained this node, you can infer the Min value without going down the tree
    if (node.pendingVal != null && contains(node.from, node.to, from, to)) {
      return node.pendingVal;
    }

    if (contains(from, to, node.from, node.to)) {
      return this.heap[index].min;
    }

    if (SegmentTree.intersects(from, to, node.from, node.to)) {
      this.propagate(index);
      const leftMin = this.rangeMinQuery(2 * index, from, to);
      const rightMin = this.rangeMinQuery(2 * index + 1, from, to);

      return Math.min(leftMin, rightMin);
    }

    return null;
  }
  update(index = 1, from, to, value) {
    //The Node of the heap tree represents a range of the array with bounds: [n.from, n.to]
    const node = this.heap[index];

    if (contains(from, to, node.from, node.to)) {
      this.change(node, value);
    }

    if (node.size() === 1) return;

    if (SegmentTree.intersects(from, to, node.from, node.to)) {
      this.propagate(index);
      this.update(2 * index, from, to, value);
      this.update(2 * index + 1, from, to, value);

      node.sum = this.heap[2 * index].sum + this.heap[2 * index + 1].sum;
      node.min = Math.min(this.heap[2 * index].min, this.heap[2 * index + 1].min);
    }
  }
  propagate(index) {
    const node = this.heap[index];
    if (node.pendingVal != null) {
      this.change(this.heap[2 * index], node.pendingVal);
      this.change(this.heap[2 * index + 1], node.pendingVal);
      node.pendingVal = null;
    }
  }
  change(node, value) {
    node.pendingVal = value;
    node.sum = node.size() * value;
    node.min = value;
    this.array[node.from] = value;
  }
  static contains(from1, to1, from2, to2) {
    return from2 >= from1 && to2 <= to1;
  }
  static intersects(from1, to1, from2, to2) {
    return (from1 <= from2 && to1 >= from2) || (from1 >= from2 && from1 <= to2);
  }
};

class SegmentTreeNode {
  constructor() {
    this.pendingVal = null;
    this.sum = 0;
    this.min = 0;
    this.from = 0;
    this.to = 0;
  }
  size() {
    return this.to - this.from + 1;
  }
}
