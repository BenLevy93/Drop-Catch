class Item {
  constructor(path, x, y, width, speed) {
    this.path = path;
    this.x = x;
    this.y = y;
    this.width = width;
    this.speed = speed || 0;
    this.img = new Image();
    this.img.src = this.path;
  }
  move() {}
}
class Boat extends Item {
  constructor(path, x, y, width, speed) {
    super(path, x, y, width, speed);
  }
  move(widthOfCanvas, speedWithDirection = 0) {
    this.x += speedWithDirection;
    if (this.x < 0) {
      this.x = 0;
    } else if (this.x > widthOfCanvas - this.width) {
      this.x = widthOfCanvas - this.width;
    }
  }
}
class Plane extends Item {
  constructor(path, x, y, width, speed) {
    super(path, x, y, width, speed);
  }

  move(widthOfCanvas) {
    //Plane goes from right to left
    this.x -= this.speed;
    if (this.x < 0) {
      this.x = widthOfCanvas - this.width;
    }
  }
}

class Parachut extends Item {
  constructor(path, x, y, width, speed, callback) {
    super(path, x, y, width, speed);
    this.callback = callback;
  }
  move(boatX, boatY, boatWidth) {
    this.y += this.speed;
    if (this.y > boatY) {
      //Catch
      if (this.x > boatX && this.x <= boatX + boatWidth) {
        this.callback(true);
      } else {
        //Miss
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
