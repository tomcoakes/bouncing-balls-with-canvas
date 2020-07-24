const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const width = canvas.width = window.innerWidth
const height = canvas.height = window.innerHeight

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min
}

class Ball {
  x: number
  y: number
  velX: number
  velY: number
  colour: string
  size: number
  constructor() {
    this.x = random(0, width)
    this.y = random(0, height)
    this.velX = random(-7, 7)
    this.velY = random(-7, 7)
    this.colour = `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`
    this.size = random(10, 60)
  }

  draw() {
    ctx.beginPath()
    ctx.fillStyle = this.colour
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    ctx.fill()
  }

  update() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -(this.velX)
    }

    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -(this.velY)
    }

    this.x += this.velX
    this.y += this.velY
  }

  collisionDetection() {
    for (let i = 0; i < balls.length; i++) {
      if ((!(this.x === balls[i].x && this.y === balls[i].y && this.velX === balls[i].velX && this.velY === balls[i].velY))) {
        const dx = this.x - balls[i].x
        const dy = this.y - balls[i].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.size + balls[i].size) {
          balls[i].color = this.colour = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
        }
      }
    }
  }
}

const balls = []

const loop = () => {
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
