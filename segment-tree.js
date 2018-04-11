
function build(index, from, to) {
  this.heap[index] = new SegmentTreeNode();
  this.heap[index].from = from;
  this.heap[index].to = from + to - 1;
  if (isLeafNode(to)) {
    const leafVal = this.containsObjects ? this.array[from][this.propertyKey] : this.array[from];
    this.heap[index].sum = leafVal;
    this.heap[index].min = leafVal;
    this.heap[index].max = leafVal;
  } else {
    build.call(this, 2 * index, from, (to / 2) | 0);
    build.call(this, 2 * index + 1, from + ((to / 2) | 0), to - ((to / 2) | 0));
    this.heap[index].sum = this.heap[2 * index].sum + this.heap[2 * index + 1].sum;
    this.heap[index].min = Math.min(this.heap[2 * index].min, this.heap[2 * index + 1].min);
    this.heap[index].max = Math.max(this.heap[2 * index].max, this.heap[2 * index + 1].max);
  }
}

function isLeafNode(to) {
  return to === 1;
}

function propagate(index) {
  const node = this.heap[index];
  if (node.pendingVal != null) {
    change.call(this, this.heap[2 * index], node.pendingVal);
    change.call(this, this.heap[2 * index + 1], node.pendingVal);
    node.pendingVal = null;
  }
}

function change(node, value) {
  node.pendingVal = value;
  node.sum = node.size() * value;
  node.min = value;
  node.max = value;
  if (this.containsObjects) {
    this.array[node.from][this.propertyKey] = value;
  } else {
    this.array[node.from] = value;
  }
}

function contains(from1, to1, from2, to2) {
  return from2 >= from1 && to2 <= to1;
}

function intersects(from1, to1, from2, to2) {
  return (from1 <= from2 && to1 >= from2) || (from1 >= from2 && from1 <= to2);
}

function hasNodeBeenUpdated(node, from, to) {
  return node.pendingVal != null && contains(node.from, node.to, from, to);
}

/**
 * Time-Complexity:  O(n*log(n))
 */
module.exports = class SegmentTree {
  constructor(array, containsObjects, propertyKey) {
    this.array = array;
    this.heap = [];
    this.containsObjects = containsObjects;
    this.propertyKey = propertyKey;
    build.call(this, 1, 0, array.length);
  }

  size() {
    return this.array.length;
  }

  rangeSumQuery(from, to, index = 1) {
    const node = this.heap[index];

    // If you did a range update that contained this node, you can infer
    // the Sum without going down the tree
    if (hasNodeBeenUpdated(node, from, to)) {
      return (to - from + 1) * node.pendingVal;
    }

    if (contains(from, to, node.from, node.to)) {
      return this.heap[index].sum;
    }

    if (intersects(from, to, node.from, node.to)) {
      propagate.call(this, index);
      const leftSum = this.rangeSumQuery(from, to, 2 * index);
      const rightSum = this.rangeSumQuery(from, to, 2 * index + 1);
      return leftSum + rightSum;
    }

    return 0;
  }

  rangeMinQuery(from, to, index = 1) {
    const node = this.heap[index];

    // If you did a range update that contained this node, you can infer the Min value without going down the tree
    if (hasNodeBeenUpdated(node, from, to)) {
      return node.pendingVal;
    }

    if (contains(from, to, node.from, node.to)) {
      return this.heap[index].min;
    }

    if (intersects(from, to, node.from, node.to)) {
      propagate.call(this, index);
      const leftMin = this.rangeMinQuery(from, to, 2 * index);
      const rightMin = this.rangeMinQuery(from, to, 2 * index + 1);

      return Math.min(leftMin, rightMin);
    }

    return Number.MAX_VALUE;
  }

  rangeMaxQuery(from, to, index = 1) {
    const node = this.heap[index];

    if (contains(from, to, node.from, node.to)) {
      return this.heap[index].max;
    }

    if (intersects(from, to, node.from, node.to)) {
      propagate.call(this, index);
      const leftMax = this.rangeMaxQuery(from, to, 2 * index);
      const rightMax = this.rangeMaxQuery(from, to, 2 * index + 1);

      return Math.max(leftMax, rightMax);
    }

    return 0;
  }

  update(from, to, value, index = 1) {
    // The Node of the heap tree represents a range of the array with bounds: [n.from, n.to]
    const node = this.heap[index];

    if (contains(from, to, node.from, node.to)) {
      change.call(this, node, value);
    }

    if (node.size() === 1) return;

    if (intersects(from, to, node.from, node.to)) {
      propagate.call(this, index);
      this.update(from, to, value, 2 * index);
      this.update(from, to, value, 2 * index + 1);

      node.sum = this.heap[2 * index].sum + this.heap[2 * index + 1].sum;
      node.min = Math.min(this.heap[2 * index].min, this.heap[2 * index + 1].min);
      node.max = Math.max(this.heap[2 * index].max, this.heap[2 * index + 1].max);
    }
  }
};

class SegmentTreeNode {
  constructor() {
    this.pendingVal = null;
    this.sum = 0;
    this.min = 0;
    this.max = 0;
    this.from = 0;
    this.to = 0;
  }
  size() {
    return this.to - this.from + 1;
  }
}
