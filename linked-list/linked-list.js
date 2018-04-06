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
   * the existing list and places the value at the end in a new get.
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
      this._tail = this.get(this.size - 1);
    }
    --this._size;
    return item.data;
  }

  /**
   * Like its array counterpart, unshift appends an get to the beginning of the list
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
   * Like its array counterpart, shift removes and returns the first get of the list
   * @return {null|*}
   */
  shift() {
    if (isEmptyList(this._head)) {
      throw new Error("Attempt to shift a List with no elements");
    } else {
      const node = this._head;
      this._head = this._head.next;
      --this._size;
      return node.data;
    }
  }

  first() {
    return this._head;
  }

  last() {
    return this._tail;
  }

  /**
   * Retrieves the data in the given position in the list.
   * @param {int} index The zero-based index of the get whose value
   *      should be returned.
   * @return {constant} The value in the "data" portion of the given get
   *      or null if the get doesn't exist.
   * @method get
   */
  get(index) {
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
   * Removes the get from the given location in the list.
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

      // special case: removing first get
      if (index === 0) {
        this._head = current.next;
      } else {
        // find the right location
        while (i++ < index) {
          previous = current;
          current = current.next;
        }

        // skip over the get to remove
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

  /**
   * Applies a function to each get in the list
   * @param fn
   */
  forEach(fn) {
    if (this.size > 0) {
      let current = this._head;
      let index = 0;

      while (current) {
        fn(current.data, index, this);
        ++index;
        current = current.next;
      }
    }
  }

  /**
   * Concat two linked lists together, appending the list passed in to the tail of this list.
   * @param linkedList
   */
  concat(linkedList) {
    this._tail.next = linkedList.first();
    this._size = this._size + linkedList.size();
  }

  /**
   * Executes the provided callback function once for each element present in the array until it
   * finds one where callback returns a falsy value. If such an element is found, the `every` method
   * immediately returns false. Otherwise, if callback returns a truthy value for all elements,
   * `every` returns true.
   * @param fn
   * @return {*}
   */
  every(fn) {
    if (isEmptyList(this._head)) {
      return false;
    } else {
      let result;
      let current = this._head;
      let index = 0;
      do {
        result = fn(current.data, index, this);
        ++index;
        current = current.next;
      } while (current && result);
      return result;
    }
  }

  /**
   * Returns a new LinkedList when given an array.
   * @param array
   * @return {module.LinkedList}
   */
  static fromArray(array) {
    const list = new LinkedList();
    for (let item of array) {
      list.push(item);
    }
    return list;
  }

  /**
   * Creates a new LinkedList with all elements that pass the test implemented by the provided function.
   * @param fn
   */
  filter(fn) {
    if (isEmptyList(this._head)) {
      return null;
    } else {
      const list = new LinkedList();
      let current = this._head;
      let index = 0;

      while (current) {
        if (fn(current.data, index, this)) {
          list.push(current);
        }
        ++index;
        current = current.next;
      }
      return list;
    }
  }

  /**
   * Determines whether a Linked List includes a certain element,
   * @param item
   * @return {boolean}
   */
  includes(item) {
    if (isEmptyList(this._head)) {
      return false;
    } else {
      let current = this._head;
      while (current) {
        if (current.data === item) {
          return true;
        }
        current = current.next;
      }
      return false;
    }
  }

  /**
   * Returns the first index at which a given element can be found in the list, or null if it is not present.
   * @param item
   * @return {*}
   */
  indexOf(item) {
    if (isEmptyList(this._head)) {
      return false;
    } else {
      let current = this._head;
      let index = 0;
      while (current) {
        if (current.data === item) {
          return index;
        }
        ++index;
        current = current.next;
      }
      return null;
    }
  }

  /**
   * Joins all elements of the list into a string, each element separated by the provided delimiter
   * @param delimiter
   */
  join(delimiter) {
    if (isEmptyList(this._head)) {
      return null;
    } else {
      let current = this._head;
      let str = "";
      let index = 1;
      while (current) {
        if (index < this._size) {
          str += current.data + delimiter;
        } else {
          str += current.data;
        }
        ++index;
        current = current.next;
      }
      return str;
    }
  }
};
