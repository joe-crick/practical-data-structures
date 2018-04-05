/**
 * Convenience method to create nodes
 * @param data
 * @param next
 * @return {{data: *, next: *}}
 */
function createNode(data, next) {
  return {
    data: data,
    next
  };
}

/**
 * Determines whether or not the list is empty
 * @param head
 * @return {boolean}
 */
function isEmptyList(head) {
  return head === null;
}

/**
 * Linked List base on code by Nicholas C Zakas. Additional modifications are my own.
 */
module.exports = class LinkedList {
  constructor() {
    this._head = null;
    this._tail = null;
    this._size = 0;
  }

  /**
   * Appends some data to the end of the list. This method traverses
   * the existing list and places the value at the end in a new item.
   * @param {constant} data The data to add to the list.
   * @return {Void}
   * @method add
   */
  push(data) {
    const node = createNode(data);

    // special case: no items in the list yet
    if (isEmptyList(this._head)) {
      this._head = node;
      this._tail = node;
    } else {
      // Set the old tail's next to the new node
      this._tail.next = node;
      // Set the tail to be the new node
      this._tail = node;
    }
    ++this._size;
  }

  /**
   * Return the last element of the list, and remove it from the list.
   * @return {*}
   */
  pop() {
    let item = null;
    if (!isEmptyList(this._head)) {
      item = this._tail;
      this._tail = this.item(this.size - 1);
    }
    --this._size;
    return item.data;
  }

  /**
   * Like its array counterpart, unshift appends an item to the beginning of the list
   * @param data
   */
  unshift(data) {
    const node = createNode(data);

    //special case: no items in the list yet
    if (isEmptyList(this._head)) {
      this._head = node;
    } else {
      node.next = this._head;
      this._head = node;
    }
    ++this._size;
  }

  /**
   * Like its array counterpart, shift removes and returns the first item of the list
   * @return {null|*}
   */
  shift() {
    const node = this._head;
    this._head = this._head.next;
    --this._size;
    return node.data;
  }

  /**
   * Retrieves the data in the given position in the list.
   * @param {int} index The zero-based index of the item whose value
   *      should be returned.
   * @return {constant} The value in the "data" portion of the given item
   *      or null if the item doesn't exist.
   * @method item
   */
  item(index) {
    // check for out-of-bounds values
    let item = null;
    if (index > -1) {
      let current = this._head;
      let i = 0;

      while (i++ < index && current) {
        current = current.next;
      }

      item = current ? current.data : null;
    }
    return item;
  }

  /**
   * Removes the item from the given location in the list.
   * @param index
   * @return {null}
   */
  remove(index) {
    // check for out-of-bounds values
    let item = null;
    if (index > -1) {
      let current = this._head;
      let previous;
      let i = 0;

      // special case: removing first item
      if (index === 0) {
        this._head = current.next;
      } else {
        // find the right location
        while (i++ < index) {
          previous = current;
          current = current.next;
        }

        // skip over the item to remove
        previous.next = current.next;
      }

      item = current ? current.data : null;
    }
    --this._size;
    return item;
  }

  /**
   * Returns the size of the list
   * @return {number}
   */
  size() {
    return this._size;
  }
};
