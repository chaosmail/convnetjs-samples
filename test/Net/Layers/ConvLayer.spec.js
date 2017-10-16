describe("ConvLayer", function() {

  // Create an input layer
  var _in = Net.Layers.InputLayer({
    width: 128, height: 128, depth: 3
  });

  describe("constructor", function(){

    var opt = {filters: 3, sx: 3, stride: 1, pad: 0, pred: _in};
    
    it("should initialize filters", function() {
      
      var layer = new Net.Layers.ConvLayer(opt);  

      var actual = layer.filters.length;
      var expected = 3;

      expect(actual).toEqual(expected);
    });    

  });

  describe("forward", function() {

    var opt = {filters: 3, sx: 3, stride: 1, pad: 0};

    it("small volume", function() {
      
      var layer = new Net.Layers.ConvLayer(opt);  
      var input = new Net.Vol(_in.sx, _in.sy, _in.depth, 1);

      var actual = layer.forward(input, false);
      var expected = new Net.Vol(5, 5, 3, 1);

      console.log(input);
      console.log(actual);

      // expect(actual).toEqual(expected);
    });
  });
});