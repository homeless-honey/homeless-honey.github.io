var song
let snowflakes = [] // array to hold snowflake objects


function preload() {
  song = loadSound('assets/Chrismas.mp3')
}

function setup() {
  createCanvas(1520, 774)
  fill(240)
  noStroke()

  song.loop()
}

function mousePressed() {
  if (song.isPlaying()) {
    // .isPlaying() returns a boolean
    song.pause(); // .play() will resume from .pause() position
  } else {
    song.play();
  }
}



function draw() {
  background(165, 42, 42, 200)
  let t = frameCount / 60 // update time

  // create a random number of snowflakes each frame
  for (let i = 0; i < random(5); i++) {
    snowflakes.push(new snowflake()) // append snowflake object
  }

  // loop through snowflakes with a for..of loop
  for (let flake of snowflakes) {
    flake.update(t) // update snowflake position
    flake.display() // draw snowflake
  }
}

// snowflake class
function snowflake() {
  // initialize coordinates
  this.posX = 0
  this.posY = random(-64, 0)
  this.initialangle = random(0, 2 * PI)
  this.size = random(2, 10)

  // radius of snowflake spiral
  // chosen so the snowflakes are uniformly spread out in area
  this.radius = sqrt(random(pow(width / 2, 2)))

  this.update = function(time) {
    // x position follows a circle
    let w = 0.6 // angular speed
    let angle = w * time + this.initialangle
    this.posX = width / 2 + this.radius * sin(angle)

    // different size snowflakes fall at slightly different y speeds
    this.posY += pow(this.size, 0.5)

    // delete snowflake if past end of screen
    if (this.posY > height) {
      let index = snowflakes.indexOf(this)
      snowflakes.splice(index, 1)
    }
  }

  this.display = function() {
    ellipse(this.posX, this.posY, this.size)
  }
}
