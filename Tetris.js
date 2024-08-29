let bg_canvas = document.getElementById("background-canvas");
let tetris_canvas = document.getElementById("tetris-canvas");

bg_canvas.style.position = "absolute";
tetris_canvas.style.position = "absolute";
bg_canvas.style.top = "50";
bg_canvas.style.left = "50";
tetris_canvas.style.top = "50";
tetris_canvas.style.left = "50";

const BG_COLOR = "#242424";
const FIELD_COLOR = "grey";
const PLAYFIELD_YMAX = 25;
const PLAYFIELD_XMAX = 10;
const Y_OFF = 5;

const ctx_bg = bg_canvas.getContext("2d");
const ctx_tetris = tetris_canvas.getContext("2d");

const DEFAULT_ORIGIN = [5, 4];

const KEY = {
  SPACE: 32, // hard drop
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40, // move piece
  C: 67, // hold piece
  P: 80, // pause
  X: 88, // rotate right
  Z: 90, // rotate left
};

const P_TYPE = {
  NONE: 0,
  I: 1,
  O: 2,
  T: 3,
  S: 4,
  Z: 5,
  J: 6,
  L: 7,
};

const P_COLORS = {
  [P_TYPE.I]: "#0f7394",
  [P_TYPE.O]: "#9cb30b",
  [P_TYPE.T]: "#a10a99",
  [P_TYPE.S]: "#11a811",
  [P_TYPE.Z]: "#4f0099",
  [P_TYPE.J]: "#c70021",
  [P_TYPE.L]: "#0e3d9c",
};

class Tetronimo {
  constructor(piece_type) {
    this.type = piece_type;
    this.origin = [0, 0];
    this.blocks = Array(4).fill([0, 0]); // block positions relative to origin
    this.spawn_piece();
    this.is_falling = true;
  }

  print() {
    console.log(this.origin);
    console.log(this.blocks);
  }

  // Since collision detection can usually be solved by checking mins and maxes, some helper methods
  // for getting them are implemented
  min_x() {
    let res = Number.MAX_SAFE_INTEGER;
    for (let block of this.blocks)
      res = Math.min(res, block[0] + this.origin[0]);
    return res;
  }

  max_x() {
    let res = Number.MIN_SAFE_INTEGER;
    for (let block of this.blocks)
      res = Math.max(res, block[0] + this.origin[0]);
    return res;
  }

  min_y() {
    let res = Number.MAX_SAFE_INTEGER;
    for (let block of this.blocks)
      res = Math.min(res, block[1] + this.origin[1]);
    return res;
  }

  max_y() {
    let res = Number.MIN_SAFE_INTEGER;
    for (let block of this.blocks)
      res = Math.max(res, block[1] + this.origin[1]);
    return res;
  }

  // check if valid move by making a copy of the tetronimo's new position and checking if there is
  // any overlap with the grid.
  // Returns true if the new move is valid
  check_move(grid, dx, dy) {
    for (let block of this.blocks) {
      let nx = this.origin[0] + dx + block[0];
      let ny = this.origin[1] + dy + block[1];
      if (grid[ny][nx] !== P_TYPE.NONE) return false;
    }
    return true;
  }

  spawn_piece() {
    this.origin = [...DEFAULT_ORIGIN];
    switch (this.type) {
      case P_TYPE.I:
        this.blocks = [
          [0, -1],
          [0, 0],
          [0, 1],
          [0, 2],
        ];
        break;
      case P_TYPE.O:
        this.blocks = [
          [-1, -1],
          [-1, 0],
          [0, -1],
          [0, 0],
        ];
        break;
      case P_TYPE.T:
        this.blocks = [
          [-1, 0],
          [0, 0],
          [1, 0],
          [0, -1],
        ];
        break;
      case P_TYPE.S:
        this.blocks = [
          [-1, 0],
          [0, 0],
          [0, -1],
          [1, -1],
        ];
        break;
      case P_TYPE.Z:
        this.blocks = [
          [-1, -1],
          [0, -1],
          [0, 0],
          [1, 0],
        ];
        break;
      case P_TYPE.J:
        this.blocks = [
          [-1, -1],
          [-1, 0],
          [0, 0],
          [1, 0],
        ];
        break;
      case P_TYPE.L:
        this.blocks = [
          [-1, 0],
          [0, 0],
          [1, 0],
          [1, -1],
        ];
        break;
    }
  }

  // This will check the grid to see if the piece can fall down. If it can, it will move piece down once.
  fall(tetris) {
    for (let block of this.blocks) {
      let x = this.origin[0] + block[0];
      let y = this.origin[1] + block[1];
      // check if min y pos is at bottom
      if (y === PLAYFIELD_YMAX - 1) {
        // at bottom
        this.is_falling = false;
      } else if (tetris.grid[y + 1][x] !== P_TYPE.NONE) {
        // if below piece is non-empty
        this.is_falling = false;
      }
      if (!this.is_falling) break;
    }
    if (this.is_falling) this.origin[1] += 1;

    console.log(`falling: ${this.is_falling}`);
  }

  move(keycode, tetris) {
    switch (keycode) {
      case KEY.LEFT:
        if (this.min_x() > 0 && this.check_move(tetris.grid, -1, 0))
          this.origin[0]--;
        break;
      case KEY.DOWN:
        if (
          this.max_y() < PLAYFIELD_YMAX - 1 &&
          this.check_move(tetris.grid, 0, +1)
        ) {
          this.origin[1]++;
          tetris.score += 1; // This will add 1 extra point for every block hard/soft dropped.
        } else {
          this.is_falling = false;
        }
        break;
      case KEY.RIGHT:
        if (
          this.max_x() < PLAYFIELD_XMAX - 1 &&
          this.check_move(tetris.grid, +1, 0)
        )
          this.origin[0]++;
        break;
      case KEY.UP: // This should be removed when were no longer testing
        if (this.max_y() > 0 && this.check_move(tetris.grid, 0, -1))
          this.origin[1]--;
        break;
      default:
        console.log("Error: Move has wrong key: ", keycode);
        break;
    }
  }

  rotate(keycode, tetris) {
    // We cannot rotate O
    if (this.type === P_TYPE.O) return;

    // Returns the rotated version of the blocks.
    const get_rotated = (keycode) => {
      // This is a separate function because we want a copy of the rotated
      // piece before actually rotating it to check if the rotation overlaps
      // with another piece, or falls outside the boundaries of the tetris.grid.
      let rotated = this.blocks.map((coord) => {
        return coord.slice();
      }); // create hard copy
      if (keycode === KEY.Z) {
        for (let coord of rotated) {
          let x = coord[0];
          let y = coord[1];
          coord[0] = y;
          coord[1] = -x;
        }
      } else if (keycode === KEY.X) {
        for (let coord of rotated) {
          let x = coord[0];
          let y = coord[1];
          coord[0] = -y;
          coord[1] = x;
        }
      }
      return rotated;
    };

    let can_rotate = true;
    let rotated = get_rotated(keycode);
    for (let rot of rotated) {
      let rx = this.origin[0] + rot[0];
      let ry = this.origin[1] + rot[1];
      // first, check if rotated position is within the boundaries of the grid
      if (rx < 0 || rx >= PLAYFIELD_XMAX || ry < 0 || ry >= PLAYFIELD_YMAX) {
        can_rotate = false;
        break;
      }
      // second, check if the rotated position overlaps with any
      // other pieces already on the grid
      if (tetris.grid[ry][rx] !== P_TYPE.NONE) {
        can_rotate = false;
        break;
      }
    }
    if (can_rotate) this.blocks = rotated;
  }

  hard_drop(tetris) {
    while (this.is_falling) {
      this.fall(tetris);
    }
    this.is_falling = false;
  }
}

// Actual Tetris Logic
class Tetris {
  constructor(start_level = 0) {
    this.reset(start_level);
  }

  reset(start_level) {
    this.grid = Array(PLAYFIELD_YMAX)
      .fill()
      .map(() => Array(PLAYFIELD_XMAX).fill(P_TYPE.NONE));
    this.piece_counter = {
      [P_TYPE.I]: 0,
      [P_TYPE.O]: 0,
      [P_TYPE.T]: 0,
      [P_TYPE.J]: 0,
      [P_TYPE.L]: 0,
      [P_TYPE.S]: 0,
      [P_TYPE.Z]: 0,
    };

    this.score = 0;
    this.level = start_level;
    this.lines_until_level_up = 10;
    this.lines_cleared = 0;
    this.tetris_count = 0;
    this.fall_interval = 0; // ms per grid
    this.update_fall_speed();

    this.queue = [];
    this.populate_queue();

    this.hold = null;
    this.held_this_turn = false;

    this.prev = {
      frame_time: 0,
      fall_time: 0,
    };
  }

  print_grid() {
    for (let y = 0; y < 25; y++) {
      let line = "";
      for (let x = 0; x < 10; x++) line += this.grid[y][x].toString();

      let y_str = y.toString().padStart(2, "0");
      console.log(`${y_str}: ${line}`);
    }
    console.log("----------------");
  }

  place_on_grid(tetronimo) {
    // set to tetris.grid
    for (let block of tetronimo.blocks) {
      let x = tetronimo.origin[0] + block[0];
      let y = tetronimo.origin[1] + block[1];
      this.grid[y][x] = this.type;
    }
  }

  get_next_piece() {
    let tetronimo = this.queue.shift();
    console.log(`Next piece type: ${tetronimo.type}`);
    this.queue.push(this.spawn_rand_piece());
    this.piece_counter[tetronimo.type]++;
    return tetronimo;
  }

  populate_queue(n = 10) {
    this.queue = [];
    for (let i = 0; i < n; i++) this.queue.push(this.spawn_rand_piece());
  }

  // If any pieces land above where the game renders, it's game over
  check_gameover() {
    for (let y = 2; y <= 4; y++) {
      for (let x = 0; x < PLAYFIELD_XMAX; x++) {
        if (this.grid[y][x] !== P_TYPE.NONE) {
          console.log("Game over!");
          console.log(this.grid);
          return true;
        }
      }
    }
    return false;
  }

  spawn_rand_piece() {
    let rand_type = Math.round(Math.random() * (P_TYPE.L - 1) + 1);
    return new Tetronimo(rand_type);
  }

  hold_piece(tetronimo) {
    if (!this.held_this_turn) {
      this.held_this_turn = true;
      tetronimo.origin = [...DEFAULT_ORIGIN];
      if (!this.hold) {
        this.hold = tetronimo;
        tetronimo = this.get_next_piece();
      } else {
        const temp = this.hold;
        this.hold = tetronimo;
        tetronimo = temp;
      }
    }
    return tetronimo;
  }

  // checks and clears all full lines, returns how many lines were cleared
  clear_lines() {
    let lines_cleared = 0;
    // Do a downward scan to see if line is full
    for (let y = 5; y < PLAYFIELD_YMAX; y++) {
      let is_full = true;

      // scan the line
      for (let x = 0; x < PLAYFIELD_XMAX; x++) {
        if (this.grid[y][x] === P_TYPE.NONE) {
          is_full = false;
          break;
        }
      }

      if (is_full) {
        console.log(`Detected full line at ${y}`);
        // clear the current line
        for (let x = 0; x < PLAYFIELD_XMAX; x++) {
          this.grid[y][x] = P_TYPE.NONE;
        }
        // shift all lines above from current y coordinate down 1
        for (let yy = y; yy >= 5; yy--) {
          this.grid[yy] = [...this.grid[yy - 1]];
        }
        lines_cleared++; // will be used for scoring when it's implemented
      }
    }
    return lines_cleared;
  }

  // keeps track of lines cleared, tetrises, and score, also handles level up when they should happen
  score_keeper(lines_cleared) {
    this.lines_cleared += lines_cleared;
    if (lines_cleared == 4) this.tetris_count++;

    // n = level
    // 1 line 		2 line 			3 line 			4 line
    // 40 * (n + 1)	100 * (n + 1)	300 * (n + 1)	1200 * (n + 1)
    switch (lines_cleared) {
      case 1:
        this.score += 40 * (this.level + 1);
        break;
      case 2:
        this.score += 100 * (this.level + 1);
        break;
      case 3:
        this.score += 301 * (this.level + 1);
        break;
      case 4:
        this.score += 1200 * (this.level + 1);
        break;
    }

    this.lines_until_level_up -= lines_cleared;
    console.log(`lines until level up: ${this.lines_until_level_up}`);
    if (this.lines_until_level_up <= 0) {
      this.lines_until_level_up += 10;
      this.level++;
      this.update_fall_speed();
    }
  }

  // When level up happens, speed up the fall speed.
  update_fall_speed() {
    if (this.level < 9) this.fall_interval = (48 - 5 * (this.level + 1)) * 61;
    else if (this.level == 9) this.fall_interval = 6 * 61;
    else if (this.level < 13) this.fall_interval = 5 * 61;
    else if (this.level < 16) this.fall_interval = 4 * 61;
    else if (this.level < 19) this.fall_interval = 3 * 61;
    else if (this.level < 29) this.fall_interval = 2 * 61;
    else this.fall_interval = 1 * 61;
  }
}

// Tetronimo objects for drawing UI
const TET_UI = [
  new Tetronimo(P_TYPE.I),
  new Tetronimo(P_TYPE.O),
  new Tetronimo(P_TYPE.T),
  new Tetronimo(P_TYPE.J),
  new Tetronimo(P_TYPE.L),
  new Tetronimo(P_TYPE.S),
  new Tetronimo(P_TYPE.Z),
];

class GFX {
  constructor() {
    this.ui_offset = tetris_canvas.width;
    this.ui_width = bg_canvas.width - tetris_canvas.width;

    // We'll use these canvases as buffers so that we don't have to keep redrawing the grids
    this.empty_grid_canvas = document.createElement("canvas");
    this.ctx_empty_grid = this.empty_grid_canvas.getContext("2d");

    this.grid_buf_canvas = document.createElement("canvas");
    this.ctx_grid_buf = this.grid_buf_canvas.getContext("2d");

    this.grid_buf_canvas.width = this.empty_grid_canvas.width =
      tetris_canvas.width;
    this.grid_buf_canvas.height = this.empty_grid_canvas.height =
      tetris_canvas.height;

    // after we draw this the first time, we'll be able to use our empty grid to redraw the
    // future grids
    this.draw_playfield(this.ctx_empty_grid);

    this.reset_grids();
  }

  draw_playfield(ctx = ctx_tetris) {
    const draw_gridlines = () => {
      const horiz_inc = tetris_canvas.height / 20;
      const vert_inc = tetris_canvas.width / 10;

      // Draw horizontal lines
      for (let y = 0; y < tetris_canvas.height; y += horiz_inc) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(tetris_canvas.width, y);
        ctx.stroke();
      }
      // Draw vertical lines
      for (let x = 0; x < tetris_canvas.width; x += vert_inc) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, tetris_canvas.height);
        ctx.stroke();
      }
    };
    ctx.fillStyle = FIELD_COLOR;
    ctx.fillRect(0, 0, tetris_canvas.width, tetris_canvas.height);
    draw_gridlines(ctx);
  }

  // Draw the actual pieces and shit on the 2d grid (except the piece currently in motion)
  draw_grid_elements(grid) {
    const ctx = tetris_canvas.getContext("2d");
    const horiz_inc = tetris_canvas.height / 20;
    const vert_inc = tetris_canvas.width / 10;

    for (let y = PLAYFIELD_YMAX - 1; y >= PLAYFIELD_YMAX - 20; y--) {
      for (let x = 0; x < PLAYFIELD_XMAX; x++) {
        // dx, dy are drawing coords
        let dx = x * horiz_inc;
        let dy = (y - Y_OFF) * vert_inc;
        if (grid[y][x] != P_TYPE.NONE) {
          ctx.fillStyle = P_COLORS[grid[y][x]];
          ctx.fillRect(dx, dy, horiz_inc, vert_inc);
        }
      }
    }
  }

  // use this after a piece landed because we need to store the new piece into the buffer.
  copy_tetris_into_grid_buf() {
    let src = tetris_canvas; // grid is in the tetris_canvas
    let dest = this.ctx_grid_buf;
    dest.drawImage(src, 0, 0);
  }

  // use this every time we need to redraw the grid for a falling piece
  copy_grid_buf_into_tetris() {
    let src = this.grid_buf_canvas;
    let dest = ctx_tetris;
    dest.drawImage(src, 0, 0);
  }

  copy_empty_grid_into_tetris() {
    let src = this.empty_grid_canvas;
    let dest = ctx_tetris;
    dest.drawImage(src, 0, 0);
  }

  reset_grids() {
    // overwrite our buffer and realtime grid with the empty_grid
    ctx_tetris.drawImage(this.empty_grid_canvas, 0, 0);
    this.ctx_grid_buf.drawImage(this.empty_grid_canvas, 0, 0);
  }

  // this will draw the tetronimo in motion
  // We are avoiding putting the tetronimo on the actual grid until it lands, this way we don't
  // have to handle creating and destroying the blocks every time it shifts down once.
  draw_falling_tetronimo(tetronimo) {
    const ctx = tetris_canvas.getContext("2d");
    const horiz_inc = tetris_canvas.height / 20;
    const vert_inc = tetris_canvas.width / 10;

    let origin = tetronimo.origin;
    let blocks = tetronimo.blocks;
    let p_type = tetronimo.type;

    ctx.fillStyle = P_COLORS[p_type];
    for (let block of blocks) {
      let dx = (origin[0] + block[0]) * horiz_inc;
      let dy = (origin[1] + block[1] - Y_OFF) * vert_inc;
      ctx.fillRect(dx, dy, horiz_inc, vert_inc);
    }
  }

  /* UI drawing methods below */

  draw_ui_all(tetris) {
    this.draw_ui_background();
    this.draw_ui_text("TetrisJS", 30, this.ui_offset + this.ui_width / 2, 32);
    this.draw_ui_stats(tetris.piece_counter);
    this.draw_ui_queue(tetris);
    this.draw_held_piece(tetris);
    this.draw_ui_text(
      "Made by Hoswoo",
      20,
      this.ui_offset + this.ui_width / 2,
      bg_canvas.height - 15,
    );
    this.draw_ui_score(tetris);
    this.draw_ui_level(tetris);
    this.draw_lines_cleared(tetris);
  }

  draw_ui_background() {
    const ctx = bg_canvas.getContext("2d");
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, bg_canvas.width, bg_canvas.height);
  }

  draw_ui_mini_piece(tetronimo, x, y) {
    const ctx = bg_canvas.getContext("2d");
    const dim = 15;
    const x_off = -100;
    const y_off = -625;

    let origin = tetronimo.origin;
    let blocks = tetronimo.blocks;
    let p_type = tetronimo.type;

    ctx.fillStyle = P_COLORS[p_type];

    for (let block of blocks) {
      let dx = x + x_off + (origin[0] + block[0]) * dim;
      let dy = y + y_off + (origin[1] + block[1]) * dim;
      ctx.fillRect(dx, dy, dim, dim);
    }
  }

  draw_ui_text(text, size, x, y) {
    const ctx = bg_canvas.getContext("2d");
    ctx.font = size.toString() + "px Arial";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.fillText(text, x, y);
  }

  draw_ui_queue(tetris, count = 5) {
    // Draw 'count' next pieces
    let x = this.ui_offset + 80;
    let y = this.ui_offset + 280;
    let y_inc = 50;

    this.draw_ui_text("Next piece", 20, x, 70);
    for (let i = 0; i < count; i++) {
      let piece = tetris.queue[i];
      this.draw_ui_mini_piece(piece, x + 15, y);
      if (piece.type == P_TYPE.I) y += 25;
      y += y_inc;
    }
  }

  draw_ui_stats(piece_counter) {
    let x = this.ui_offset + 220;
    let x_gap = 25;
    let y = this.ui_offset + 355;
    let y_inc = 50;
    let i_piece = TET_UI[0];

    this.draw_ui_text("Statistics", 20, x, 70);
    this.draw_ui_mini_piece(i_piece, x, this.ui_offset + 280);
    this.draw_ui_text(piece_counter[P_TYPE.I].toString(), 20, x + x_gap, 128);

    let dy = 185;
    let dy_inc = 50;
    for (let i = 1; i < TET_UI.length; i++) {
      let piece = TET_UI[i];
      this.draw_ui_mini_piece(piece, x, y);
      this.draw_ui_text(piece_counter[piece.type], 20, x + x_gap, dy);
      y += y_inc;
      dy += dy_inc;
    }
  }

  draw_ui_score(tetris) {
    let x = this.ui_offset + 100;
    let y = 725;
    let y_inc = 25;
    this.draw_ui_text(`SCORE`, 20, x - 48, y);
    this.draw_ui_text(
      `${tetris.score.toString().padStart(10, "0")}`,
      30,
      x,
      y + y_inc,
    );
  }

  draw_ui_level(tetris) {
    let x = this.ui_offset + 285;
    let y = 725;
    let y_inc = 25;
    this.draw_ui_text(`LEVEL`, 20, x - 48, y);
    this.draw_ui_text(
      `${tetris.level.toString().padStart(2, "0")}`,
      30,
      x - 65,
      y + y_inc,
    );
  }

  draw_lines_cleared(tetris) {
    // also displays tetris count
    let x = this.ui_offset + 100;
    let y = 675;
    let y_inc = 25;
    this.draw_ui_text(`LINES`, 20, x - 54, y);
    this.draw_ui_text(
      `${tetris.lines_cleared.toString().padStart(3, "0")} `,
      30,
      x - 54,
      y + y_inc,
    );
    this.draw_ui_text(`TETRIS`, 20, x + 140, y);
    this.draw_ui_text(
      `${tetris.tetris_count.toString().padStart(3, "0")}`,
      30,
      x + 130,
      y + y_inc,
    );
  }

  draw_held_piece(tetris) {
    let x = this.ui_offset + 100;
    let y = 1140;
    this.draw_ui_text(`HOLD`, 20, x - 55, 550);
    if (tetris.hold) this.draw_ui_mini_piece(tetris.hold, x - 38, 1140);
  }
}

const FPS = 61;
const START_LEVEL = 0;
let interval = 1000 / FPS;
let prev = {
  frame: 0,
  fall: 0,
};

let gfx = new GFX();
let tetris = new Tetris(START_LEVEL);

function handle_input(e) {
  let keycode = e.keyCode;
  switch (keycode) {
    case KEY.LEFT:
    case KEY.RIGHT:
    case KEY.DOWN:
      tetronimo.move(keycode, tetris);
      break;
    case KEY.C:
      tetronimo = tetris.hold_piece(tetronimo);
      break;
    case KEY.X:
    case KEY.Z:
      tetronimo.rotate(keycode, tetris);
      break;
    case KEY.SPACE:
      tetronimo.hard_drop(tetris);
      break;
  }
  gfx.copy_grid_buf_into_tetris();
  gfx.draw_falling_tetronimo(tetronimo);
}

function enable_movement_controls() {
  document.addEventListener("keydown", handle_input);
}

function disable_movement_controls() {
  document.removeEventListener("keydown", handle_input);
}

enable_movement_controls();

let tetronimo = tetris.queue.shift();
tetris.piece_counter[tetronimo.type]++;

let frames = 0;

function game_loop(curr_time) {
  requestAnimationFrame(game_loop);
  const delta_frame = curr_time - prev.frame;
  if (delta_frame > interval) {
    frames++;
    prev.frame = curr_time - (delta_frame % interval);

    const delta_fall = curr_time - prev.fall;
    if (delta_fall > tetris.fall_interval) {
      prev.fall = curr_time - (delta_fall % tetris.fall_interval);
      tetronimo.fall(tetris);
      gfx.copy_grid_buf_into_tetris();
      gfx.draw_falling_tetronimo(tetronimo);
    }

    if (!tetronimo.is_falling) {
      tetris.held_this_turn = false;
      tetris.place_on_grid(tetronimo);

      console.log("OLD PIECE");
      console.log(tetronimo);
      console.log("GRID BEFORE DROP");
      // tetris.print_grid();

      // grab a piece from queue and spawn a new one
      tetronimo = tetris.get_next_piece();
      let lines_cleared_this_turn = tetris.clear_lines();
      if (lines_cleared_this_turn > 0) {
        tetris.score_keeper(lines_cleared_this_turn);
        gfx.copy_empty_grid_into_tetris();
        gfx.draw_grid_elements(tetris.grid);
      }

      // Draw what we already have in our buffer
      // when the tetronimo lands, we need to redraw
      // the other pieces and new piece on the grid,
      // then the grid buffer needs to be set to the current grid's state
      gfx.copy_tetris_into_grid_buf();
    }

    gfx.draw_ui_all(tetris);
  }

  if (tetris.check_gameover()) {
    gfx.reset_grids();
    tetris.reset(START_LEVEL);
  }
}

requestAnimationFrame(game_loop);
