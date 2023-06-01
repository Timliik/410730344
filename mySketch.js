var airplane;
var monsters = [];
var bullets = [];
var colors = "cdb4db-ffc8dd-ffafcc-bde0fe-a2d2ff".split("-").map(a => "#" + a);
var score = 0;
var isGameOver=false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  airplane = new Airplane();

  // Create monsters
  for (var i = 0; i < 30; i++) {
    monsters.push(new Monster());
  }
}

function draw() {
  background(220);

	if(!isGameOver){
	
  // Update and display airplane
  airplane.update();
  airplane.display();

  // Update and display monsters
  for (let i = monsters.length - 1; i >= 0; i--) {
    monsters[i].update();
    monsters[i].display();

    // Check if airplane hits a monster
    if (airplane.hits(monsters[i])) {
      isGameOver=true;// Remove the collided monster
      break; 
    }
  }

  // Update and display bullets
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].update();
    bullets[i].display();

    // Check if a bullet hits a monster
    for (let j = monsters.length - 1; j >= 0; j--) {
      if (bullets[i].hits(monsters[j])) {
        bullets.splice(i, 1); // Remove the bullet
        monsters.splice(j, 1); // Remove the collided monster
        score++; // Increment score
        break; // Exit the loop since the bullet hit a monster
      }
    }
  }
	}
  // Display score
  fill(0);
  textSize(20);
  text("Score: " + score, 10, 30);
}

if(isGameOver){
	
noLoop();
}

// Airplane class
class Airplane {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.width = 40;
    this.height = 20;
  }

  update() {
    // Move airplane
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += 5;
    }
    // Limit airplane within the canvas
    this.x = constrain(this.x, this.width / 2, width - this.width / 2);
    this.y = constrain(this.y, this.height / 2, height - this.height / 2);
  }

  display() {
    // Draw airplane
    fill("#BCD0C7");
    rectMode(CENTER);
    rect(this.x, this.y, this.width, this.height);
  }

  hits(monster) {
    // Check if airplane hits a monster
    let d = dist(this.x, this.y, monster.p.x, monster.p.y);
    return d < this.width / 2 + monster.r / 2;
  }
}

// Monster class
class Monster {
  constructor() {
    this.r = random(50, 100);
    this.p = createVector(random(width), random(height));
    this.v = createVector(random(-1, 1), random(-1, 1));
    this.color = random(colors);
  }

  update() {
    // Move monster
    this.p.add(this.v);

    if (this.p.x <= 0 || this.p.x >= width) {
      // Reverse the x-axis velocity when hitting the left or right edge
      this.v.x = -this.v.x;
    }

    if (this.p.y <= 0 || this.p.y >= height) {
      // Reverse the y-axis velocity when hitting the top or bottom edge
      this.v.y = -this.v.y;
    }
  }

  display() {
    // Draw monster
    push();
    translate(this.p.x, this.p.y);
    strokeWeight(2);

    // Body
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.r, this.r);

    // Eyes
    fill(255);
    ellipse(this.r / 3, -this.r / 3, this.r / 6);
    ellipse(-this.r / 3, -this.r / 3, this.r / 6);

    // Mouth
    fill(0);
    rectMode(CENTER);
    rect(0, 0, this.r / 2, this.r / 4);
    ellipse(0, 0, this.r / 3);

    // Limbs
    fill(this.color);
    rect(-this.r / 3 - 6, -this.r / 3 + 30, this.r / 6, this.r / 6); // Legs
    rect(this.r / 3 + 6, -this.r / 3 + 30, this.r / 6, this.r / 6);
    rect(-this.r / 3 - 6, -this.r / 3 + 10, this.r / 6, this.r / 6); // Arms
    rect(this.r / 3 + 6, -this.r / 3 + 10, this.r / 6, this.r / 6);

    pop();
  }
}

// Bullet class
class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.r = 5; // Bullet radius
    this.speed = 5; // Bullet speed
  }

  update() {
    this.y -= this.speed; // Move the bullet upwards
  }

  display() {
    fill(255); // White color for the bullet
    ellipse(this.x, this.y, this.r * 2, this.r * 2); // Draw the bullet
  }

  hits(monster) {
    let d = dist(this.x, this.y, monster.p.x, monster.p.y);
    return d < this.r+monster.r/2
  }

 //shoot() {
    // Create a new bullet at the airplane's position
    //var bullet = new Bullet(this.x, this.y);
    // Add the bullet to the array
   // bullets.push(bullet);
  //}
}
// Create p5.js environment
function setup() {
  createCanvas(windowWidth, windowHeight);
  airplane = new Airplane();

  // Create monsters
  for (let i = 0; i < 30; i++) {
    monsters.push(new Monster());
  }
}

function keyPressed() {
  if (keyCode === 32) {
    // Spacebar key
    var bullet = new Bullet(airplane.x, airplane.y);
    bullets.push(bullet);
  }
}


