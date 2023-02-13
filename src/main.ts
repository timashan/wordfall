import * as PIXI from "pixi.js";
import * as txt_style from "./text_style";
// import word_list from "./words";
import WordBox from "./WordBox";
import ScoreBoard from "./scoreboard";
import * as F from "./handlers";

let word_boxes: WordBox[] = [];
let typed_words: string[] = [];
let play: boolean = true;
let width = window.innerWidth;
let height = window.innerHeight - 5;
const start_time = Date.now();
let time = 0;

const remove_box = (box: WordBox) => {
  game_stage.removeChild(box.container);
  const idx = word_boxes.findIndex((b) => b.id === box.id);
  word_boxes.splice(idx, 1);
};

const view_el = document.getElementById("pixi-canvas") as HTMLCanvasElement;

const app = new PIXI.Application({
  view: view_el,
  width: width,
  height: height,
  backgroundAlpha: 0,
  resolution: window.devicePixelRatio || 1,
  autoDensity: true,
  backgroundColor: 0x0a0a0a,
});

const game_stage = new PIXI.Container();
app.stage.addChild(game_stage);

const scoreboard = new ScoreBoard(app);
game_stage.addChild(scoreboard.container);

app.ticker.add((delta) => {
  // console.log(delta);
  // scoreboard.container.x += 10;
});

const create_word_box = () => {
  const wordbox = new WordBox();
  game_stage.addChild(wordbox.create());
  word_boxes.push(wordbox);
};
create_word_box();

app.ticker.add((d) => {
  word_boxes.forEach((box) => {
    box.animate();

    if (box.container.y > height) {
      remove_box(box);
    }
  });

  time = Math.trunc((Date.now() - start_time) / 1000);
  const len = word_boxes.length;
  let create_treshold = 0;
  if (time >= 5) create_treshold = 1;
  if (time >= 10) create_treshold = 2;
  if (time >= 30) create_treshold = 3;
  if (time >= 60) create_treshold = 4;
  // console.log(create_treshold);
  if (len <= create_treshold) create_word_box();
});

document.addEventListener("keydown", (e) => {
  const key = e.key.toLowerCase();
  if (!key) return;
  typed_words.push(key);

  let selected_boxes = word_boxes.filter((box) => {
    const s1 = typed_words.join("");
    const s2 = [...box.text].splice(0, typed_words.length).join("");
    if (s1 === s2) {
      box.text_typed.text = s1;
      return box;
    }
    if (!box.text_typed.text) return;
    // if (box.text_typed.text.length === 1) return;
    // box.invalid();
    box.text_typed.text = "";
  });

  if (selected_boxes.length === 0) {
    selected_boxes = word_boxes.filter((box) => {
      const s1 = typed_words[typed_words.length - 1];
      const s2 = [...box.text].splice(0, [...s1].length).join("");
      if (s1 === s2) {
        box.text_typed.text = s1;
        typed_words = [s1];
        return box;
      }
    });
  }

  // If success
  selected_boxes = selected_boxes.filter((box) => {
    if (box.text === typed_words.join("")) {
      setTimeout(() => {
        // box.text_typed = "red";
        remove_box(box);
        scoreboard.increment();
      }, 100);
    } else {
      return box;
    }
  });
  if (selected_boxes.length === 0) typed_words = [];
  // console.log(typed_words);
});

window.addEventListener("resize", (e) => {
  // view_el.style.width = window.innerWidth + "px";
  // view_el.style.height = window.innerHeight - 5 + "px";
  // app.screen.width = window.innerWidth;
  // app.screen.height = window.innerHeight - 5;
});
