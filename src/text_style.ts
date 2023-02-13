import * as PIXI from "pixi.js";

const def1 = {
  align: "center",
  fill: "#e7e7e7",
  fontSize: 32,
  fontFamily: "Arial Black",
  // fontStyle: "italic",
} as PIXI.ITextStyle;

export const white = new PIXI.TextStyle(def1 as PIXI.TextStyle);

const def2 = def1;
def2.fill = "#26B57B";
export const green = new PIXI.TextStyle(def2 as PIXI.TextStyle);

const def3 = def1;
def2.fill = "#ee4b2b";
export const red = new PIXI.TextStyle(def2 as PIXI.TextStyle);
