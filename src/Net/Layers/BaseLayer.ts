/// <reference path="../../NumJS/_module.ts" />
/// <reference path="../Vol.ts" />
/// <reference path="../ILayer.ts" />
/// <reference path="../Utils.ts" />

namespace Net.Layers {

  const nj = NumJS;

  export class BaseLayer {
    public in_act: Vol | Vol[];
    public out_act: Vol;
    
    public in_depth: number = 1;
    public in_sy: number = 1;
    public in_sx: number = 1;

    public out_depth: number = 1;
    public out_sy: number = 1;
    public out_sx: number = 1;

    public name: string;
    public input: string;
    public output: string;
    public layer_type: string;

    constructor(opt: any) {
      this.name = opt.name !== undefined ? opt.name : "";
      this.input = opt.input !== undefined ? opt.input : undefined;
      this.output = opt.output !== undefined ? opt.output : undefined;

      if (!opt.pred) {
        this.in_sx = opt.in_sx;
        this.in_sy = opt.in_sy;
        this.in_depth = opt.in_depth;
      }
    }

    updateDimensions(pred?: ILayer[]) {

      if (pred){
        this.in_sx = pred[0].out_sx;
        this.in_sy = pred[0].out_sy;
        this.in_depth = pred[0].out_depth;
      }

      this.out_sx = this.in_sx;
      this.out_sy = this.in_sy;
      this.out_depth = this.in_depth;
    }

    resetGradient() {
      if (this.in_act instanceof Array) {
        for (var j = 0; j < (<Vol[]>this.in_act).length; j++) {
          (<Vol[]>this.in_act)[j].dw = nj.zeros((<Vol[]>this.in_act)[j].w.length);
        }
      }
      else {
        (<Vol>this.in_act).dw = nj.zeros((<Vol>this.in_act).w.length);
      }
    }

    getNumParameters() {
      return [0, 0];
    }

    getOutputShape() {
      if (this.in_sy && this.in_sx) {
        return [this.in_depth, this.in_sy, this.in_sx];
      }
      return [this.in_depth];
    }

    getDescription(){   
     return [this.layer_type.toUpperCase(), this.name];
    }

    getParamsAndGrads() {
      return [];
    }

    toJSON() {
      var json: any = {};
      json.out_depth = this.out_depth;
      json.out_sx = this.out_sx;
      json.out_sy = this.out_sy;
      json.layer_type = this.layer_type;
      json.name = this.name;
      json.output = this.output;
      json.input = this.input;
      return json;
    }

    fromJSON(json: any) {
      this.out_depth = json.out_depth;
      this.out_sx = json.out_sx;
      this.out_sy = json.out_sy;
      this.layer_type = json.layer_type;
      this.name = json.name;
      this.output = json.output;
      this.input = json.input;
    }
  }
}
