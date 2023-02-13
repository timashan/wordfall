import * as PIXI from "pixi.js";
import * as txt_style from "./text_style";
import word_list from "./words";
import * as F from "./handlers";

class WordBox {
  id = "WB" + Math.random();
  container = new PIXI.Container();
  text_shadow: PIXI.Text;
  text_typed: PIXI.Text;
  speed: number;

  constructor(public text: string = F.choice(word_list)) {
    this.text_shadow = new PIXI.Text(this.text, txt_style.green);
    this.text_typed = new PIXI.Text("", txt_style.white);
    this.container.y = -this.text_shadow.height;

    const w = this.text_shadow.width;
    const pad = 10;
    this.container.x =
      Math.trunc(Math.random() * (window.innerWidth - w - pad)) + pad;

    this.speed = 7 - text.length;
    if (this.speed <= 0) this.speed = 1;
    this.speed += Math.trunc(Math.random() * 5 * 10) / 100;
  }

  animate() {
    this.container.y += this.speed;
  }

  create() {
    this.container.addChild(...[this.text_shadow, this.text_typed]);
    return this.container;
  }
}

export default WordBox;
