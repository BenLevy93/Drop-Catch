class Item {
  constructor(path, x, y, width, height, speed) {
    this.path = path;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed || 0;
    this.img = new Image();
    this.img.src = this.path;
  }

  getPos() {
    return { x: this.x, y: this.y };
  }
  move() {}
}
class Boat extends Item {
  constructor(path, x, y, width, height, speed) {
    super(path, x, y, width, height, speed);
  }
  move(canvas, speedWithDirection = 0) {
    this.x += speedWithDirection;
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > canvas.width - this.width) {
      this.x = canvas.width - this.width;
    }
  }
}
class Plane extends Item {
  constructor(path, x, y, width, height, speed) {
    super(path, x, y, width, height, speed);
  }

  move(canvas) {
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = canvas.width - this.width;
    }
  }
}

class Parachut extends Item {
  constructor(path, x, y, width, height, speed, callback) {
    super(path, x, y, width, height, speed);
    this.callback = callback;
  }
  move(boatX, boatY, boatWidth) {
    this.y += this.speed;
    if (this.y > boatY) {
      if (this.x > boatX && this.x <= boatX + boatWidth) {
        this.callback(true);
      } else {
        this.callback(false);
      }
    }
  }
}

class TextField {
  constructor(title, x, y, size, font) {
    this.title = title;
    this.x = x;
    this.y = y;
    this.size = size;
    this.font = font;
  }
  show(context, value) {
    context.font = this.size + " " + this.font;
    context.fillText(this.title + value, this.x, this.y);
  }
}
