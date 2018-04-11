const SegmentTree = require('../segment-tree');

describe("Segment Tree", function() {

  it("should create a Segment Tree from a numeric Array", function () {
    const expected = 3;
    const tree = new SegmentTree([1,2,3]);
    const actual = tree.size();
    expect(actual).toEqual(expected);
  });

});