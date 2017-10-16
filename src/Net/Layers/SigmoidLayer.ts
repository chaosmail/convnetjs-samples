/// <reference path="./BaseLayer.ts" />

namespace Net.Layers {

  const nj = NumJS;

  // Implements Sigmoid nnonlinearity elementwise
  // x -> 1/(1+e^(-x))
  // so the output is between 0 and 1.
  export class SigmoidLayer extends BaseLayer implements ILayer {

    public layer_type: string = 'sigmoid';

    public in_act: Vol;
    public out_act: Vol;

    constructor(opt) {
      super(opt || {});

      this.updateDimensions(opt.pred);
    }

    forward(V, is_training) {
      this.in_act = V;
      this.resetGradient();
      var V2 = V.cloneAndZero();
      var N = V.w.length;
      var V2w = V2.w;
      var Vw = V.w;
      for (var i = 0; i < N; i++) {
        V2w[i] = 1.0 / (1.0 + Math.exp(-Vw[i]));
      }
      this.out_act = V2;
      return this.out_act;
    }

    backward() {
      var V = this.in_act; // we need to set dw of this
      var V2 = this.out_act;
      var N = V.w.length;
      for (var i = 0; i < N; i++) {
        var v2wi = V2.w[i];
        V.dw[i] += v2wi * (1.0 - v2wi) * V2.dw[i];
      }
    }
  }
}
