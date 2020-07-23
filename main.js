
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

function Ball() {
  this.x = random(0, width)
  this.y = random(0, height)
  this.velX = random(-7, 7)
  this.velY = random(-7, 7)
  this.colour = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
  this.size = random(10, 60)
}

Ball.prototype.draw = function() {
  ctx.beginPath()
  ctx.fillStyle = this.colour
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
  ctx.fill()
}

Ball.prototype.update = function() {
  if((this.x + this.size) >= width || (this.x - this.size) <= 0) {
    this.velX = -(this.velX)
  }

  if((this.y + this.size) >= height || (this.y - this.size) <= 0) {
    this.velY = -(this.velY)
  }

  this.x += this.velX
  this.y += this.velY
}

Ball.prototype.collisionDetection = function() {
  for(let i = 0; i < balls.length; i++) {
    if( (!(this.x === balls[i].x && this.y === balls[i].y && this.velX === balls[i].velX && this.velY === balls[i].velY)) ) {
      const dx = this.x - balls[i].x
      const dy = this.y - balls[i].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < this.size + balls[i].size) {
        balls[i].color = this.colour = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
}

const balls = []

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
  ctx.fillRect(0, 0, width, height)

  while(balls.length < 25) {
    const ball = new Ball()
    balls.push(ball)
  }

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw()
    balls[i].update()
    balls[i].collisionDetection()
  }

  requestAnimationFrame(loop)
}

loop()
