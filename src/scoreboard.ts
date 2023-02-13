import * as PIXI from "pixi.js";
import * as txt_style from "./text_style";
import * as F from "./handlers";

class ScoreBoard {
  score: number;
  container: PIXI.Text;

  constructor(public app: PIXI.Application<PIXI.ICanvas>, score: number = 0) {
    this.score = score;
    this.container = new PIXI.Text(`score: ${this.score}`, txt_style.white);

    this.app.ticker.add((d) => {
      this.container.x += 1;

      if (this.container.x > app.screen.width) {
        this.container.x = -this.container.width;
      }
    });
  }

  increment(value = 1) {
    this.score++;
    this.container.text = `score: ${this.score}X`;
  }
}

export default ScoreBoard;
