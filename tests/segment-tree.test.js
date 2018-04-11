const SegmentTree = require("../segment-tree");
const faker = require("faker");

describe("Segment Tree", function() {
  describe("Numeric Array", function() {
    it("should create a Segment Tree from a numeric Array", function() {
      const expected = 3;
      const tree = new SegmentTree([1, 2, 3]);
      const actual = tree.size();
      expect(actual).toEqual(expected);
    });

    it("should query a range in the tree for a minimum value", function() {
      const expected = 1;
      const tree = new SegmentTree([1, 2, 3]);
      const actual = tree.rangeMinQuery(0, 3);
      expect(actual).toEqual(expected);
    });

    it("should query a range in the tree for a maximum value", function() {
      const expected = 3;
      const tree = new SegmentTree([1, 2, 3]);
      const actual = tree.rangeMaxQuery(0, 3);
      expect(actual).toEqual(expected);
    });

    it("should query a range in the tree for a sum", function() {
      const expected = 6;
      const tree = new SegmentTree([1, 2, 3]);
      const actual = tree.rangeSumQuery(0, 3);
      expect(actual).toEqual(expected);
    });

    it("should update a value in the tree", function() {
      const expected = 7;
      const tree = new SegmentTree([1, 2, 3]);
      tree.update(1, 1, 3);
      const actual = tree.rangeSumQuery(0, 3);
      expect(actual).toEqual(expected);
    });
  });

  describe("Object Array", function() {

    let treeBase;
    const propertyKey = 'price';

    beforeEach(function() {
      treeBase = [];
      for (let x = 1; x < 4; x++) {
        treeBase.push({
          item: faker.commerce.productName(),
          price: x
        });
      }
    });

    it("should create a Segment Tree from an object Array", function() {
      const expected = 3;
      const tree = new SegmentTree(treeBase, true, propertyKey);
      const actual = tree.size();
      expect(actual).toEqual(expected);
    });

    it("should query a range in the tree for a minimum value", function() {
      const expected = 1;
      const tree = new SegmentTree(treeBase, true, propertyKey);
      const actual = tree.rangeMinQuery(0, 3);
      expect(actual).toEqual(expected);
    });

    it("should query a range in the tree for a maximum value", function() {
      const expected = 3;
      const tree = new SegmentTree(treeBase, true, propertyKey);
      const actual = tree.rangeMaxQuery(0, 3);
      expect(actual).toEqual(expected);
    });

    it("should query a range in the tree for a sum", function() {
      const expected = 6;
      const tree = new SegmentTree(treeBase, true, propertyKey);
      const actual = tree.rangeSumQuery(0, 3);
      expect(actual).toEqual(expected);
    });

    it("should update a value in the tree", function() {
      const expected = 7;
      const tree = new SegmentTree(treeBase, true, propertyKey);
      tree.update(1, 1, 3);
      const actual = tree.rangeSumQuery(0, 3);
      expect(actual).toEqual(expected);
    });

  });
});
