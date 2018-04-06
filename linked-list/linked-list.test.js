const LinkedList = require("./linked-list");

describe("Linked List", function() {
  it("adds an get to the list using push", function() {
    const expected = 1;
    const linkedList = new LinkedList();
    linkedList.push(expected);
    const actual = linkedList.size();
    expect(actual).toEqual(expected);
  });
  it("adds an get to the end of the list using push", function() {
    const afterFirst = 2;
    const linkedList = new LinkedList();
    linkedList.push(1);
    linkedList.push(afterFirst);
    const isAfter = linkedList.get(1);
    expect(isAfter).toEqual(afterFirst);
  });
  it("removes an get from the list using pop", function() {
    const expected = 0;
    const linkedList = new LinkedList();
    linkedList.push(expected);
    linkedList.pop();
    const actual = linkedList.size();
    expect(actual).toEqual(expected);
  });
  it("removes an get from the end of the list using pop", function() {
    const expected = 0;
    const linkedList = new LinkedList();
    linkedList.push(1);
    linkedList.push(expected);
    const actual = linkedList.pop();
    expect(actual).toEqual(expected);
    expect(linkedList.size()).toEqual(1);
  });
  it("returns an get by index", function() {
    const expected = 2;
    const linkedList = new LinkedList();
    linkedList.push(1);
    linkedList.push(expected);
    linkedList.push(3);
    const actual = linkedList.get(1);
    expect(actual).toEqual(expected);
  });
  it("prepends an get to the list when using unshift", function() {
    const expected = 2;
    const linkedList = new LinkedList();
    linkedList.push(1);
    linkedList.push(3);
    linkedList.unshift(expected);
    const actual = linkedList.get(0);
    expect(actual).toEqual(expected);
  });
  it("removes the first get from the list when using shift", function() {
    const expected = 1;
    const linkedList = new LinkedList();
    linkedList.push(expected);
    linkedList.push(2);
    linkedList.push(3);
    expect(linkedList.size()).toEqual(3);
    const actual = linkedList.shift();
    expect(actual).toEqual(expected);
    expect(linkedList.size()).toEqual(2);
  });
  it("removes and returns an get from the list by index using remove", function() {
    const expected = 2;
    const linkedList = new LinkedList();
    linkedList.push(1);
    linkedList.push(expected);
    linkedList.push(3);
    expect(linkedList.size()).toEqual(3);
    const actual = linkedList.remove(1);
    expect(actual).toEqual(expected);
    expect(linkedList.size()).toEqual(2);
  });
  it("concatenates two Linked Lists", function() {
    const expected = 2;
    const listOne = new LinkedList();
    const listTwo = new LinkedList();
    listOne.push(1);
    listTwo.push(2);
    listOne.concat(listTwo);
    expect(listOne.size()).toEqual(expected);
    expect(listOne.get(1)).toEqual(expected);
  });
  it("converts an array to a LinkedList using fromArray", function() {
    const expected = 3;
    const linkedList = LinkedList.fromArray([1, 2, 3]);
    const actual = linkedList.size();
    expect(actual).toEqual(expected);
  });
  it("returns true when every is called if every element matches the predicate", function() {
    const expected = true;
    const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
    const actual = linkedList.every(function(item) {
      return item < 10;
    });
    expect(actual).toEqual(expected);
  });
  it("returns false when every is called if an element doesn't match the predicate", function() {
    const expected = false;
    const linkedList = LinkedList.fromArray([1, 2, 3, 4, 10]);
    const actual = linkedList.every(function(item) {
      return item < 10;
    });
    expect(actual).toEqual(expected);
  });
  it("filters a list with a predicate", function() {
    const expected = 3;
    const linkedList = LinkedList.fromArray([1, 2, 3, 4, 5]);
    const actual = linkedList
      .filter(function(item) {
        return item < 4;
      })
      .size();
    expect(actual).toEqual(expected);
  });
  it("returns true if an item is contained in a list when includes is called", function() {
    const expected = true;
    const linkedList = LinkedList.fromArray([1, 2, "test", 4, 5]);
    const actual = linkedList.includes("test");
    expect(actual).toEqual(expected);
  });
  it("returns false if an item is NOT contained in a list when includes is called", function() {
    const expected = false;
    const linkedList = LinkedList.fromArray([1, 2, "test", 4, 5]);
    const actual = linkedList.includes(22);
    expect(actual).toEqual(expected);
  });
});
