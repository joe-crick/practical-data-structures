const LinkedList = require("./linked-list");

describe("Linked List", function() {
  it("adds an item to the list using push", function() {
    const expected = 1;
    const linkedList = new LinkedList();
    linkedList.push(expected);
    const actual = linkedList.size();
    expect(actual).toEqual(expected);
  });
  it("adds an item to the end of the list using push", function () {
    const afterFirst = 2;
    const linkedList = new LinkedList();
    linkedList.push(1);
    linkedList.push(afterFirst);
    const isAfter = linkedList.item(1);
    expect(isAfter).toEqual(afterFirst);
  });
  it("removes an item from the list using pop", function() {
    const expected = 0;
    const linkedList = new LinkedList();
    linkedList.push(expected);
    linkedList.pop();
    const actual = linkedList.size();
    expect(actual).toEqual(expected);
  });
  it("removes an item from the end of the list using pop", function() {
    const expected = 0;
    const linkedList = new LinkedList();
    linkedList.push(1);
    linkedList.push(expected);
    const actual = linkedList.pop();
    expect(actual).toEqual(expected);
    expect(linkedList.size()).toEqual(1);
  });
  it("returns an item by index", function() {
    const expected = 2;
    const linkedList = new LinkedList();
    linkedList.push(1);
    linkedList.push(expected);
    linkedList.push(3);
    const actual = linkedList.item(1);
    expect(actual).toEqual(expected);
  });
  it("prepends an item to the list when using unshift", function() {
    const expected = 2;
    const linkedList = new LinkedList();
    linkedList.push(1);
    linkedList.push(3);
    linkedList.unshift(expected);
    const actual = linkedList.item(0);
    expect(actual).toEqual(expected);
  });
  it("removes the first item from the list when using shift", function() {
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
  it("removes and returns an item from the list by index using remove", function() {
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
});
