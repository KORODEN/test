const platform = 'img/platform.png'
const hills = 'img/hills.png'
const background = 'img/background.png'
const platformSmallTall = 'img/platformSmallTall.png'

const spriteRunLeft = 'img/spriteRunLeft.png'
const spriteRunRight = 'img/spriteRunRight.png'
const spriteStandLeft = 'img/spriteStandLeft.png'
const spriteStandRight = 'img/spriteStandRight.png'

window.onload = function() {
    const audio = new Audio()
    audio.src = '31842.mp3'
    audio.volume = 0.1
    audio.loop = true
    audio.autoplay = true
 }

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1.5

class Player {
    constructor() {
        this.speed = 10
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 66
        this.height = 150
        
        this.image = createImage(spriteStandRight)
        this.frames = 0
        this.sprites = {
          stand: {
            right: createImage(spriteStandRight),
            left: createImage(spriteStandLeft),
            cropWidth: 177,
            width: 66
          },
          run: {
            right: createImage(spriteRunRight),
            left: createImage(spriteRunLeft),
            cropWidth: 341,
            width: 127.875
          }
        }

        this.currentSprite = this.sprites.stand.right
        this.curruntCropWidth = this.sprites.stand.cropWidth
    }

    draw() {
      c.drawImage(
        this.currentSprite,
        this.curruntCropWidth * this.frames,
        0,
        this.curruntCropWidth,
        400,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      )
    }

    update() {
        this.frames++
        if(this.frames > 59 && (this.currentSprite === this.sprites.stand.right || this.currentSprite === this.sprites.stand.left)) {
          this.frames = 0
        } else if(this.frames > 29 && (this.currentSprite === this.sprites.run.right || this.currentSprite === this.sprites.run.left)) {
          this.frames = 0
        }

        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if(this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
    }
}

class Platform {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

class GenericObject {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = image.width
        this.height = image.height
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)

let player
let platforms = []
let genericObjects = []

let lastKey
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0
let currentScore = 0
let recordScore = 0
let isAlive = false

function init() {
    platformImage = createImage(platform)
    platformSmallTallImage = createImage(platformSmallTall)
    isAlive = true

    player = new Player()
    platforms = [
        new Platform({
            x: platformImage.width - 2 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 4 + 9 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 4 + 300 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 6 + 350 - 2 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 8 - 170 + platformImage.width - platformSmallTallImage.width,
            y: 170,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 9 - 300 + platformImage.width - platformSmallTallImage.width,
            y: 170,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 10 - 200 + platformImage.width - platformSmallTallImage.width,
            y: 170,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 11 + 200 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 12 + 200 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 14 + 200 + platformImage.width - platformSmallTallImage.width,
            y: 370,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 15 + 200 + platformImage.width - platformSmallTallImage.width,
            y: 370,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 16 + 200 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage
        }),
        new Platform({
            x: platformImage.width * 17 + 300 + platformImage.width - platformSmallTallImage.width,
            y: 270,
            image: platformSmallTallImage
        }),
        new Platform({
            x: -1,
            y: 470,
            image: platformImage
        }), 
        new Platform({
            x: platformImage.width - 3,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 2 + 150,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 3 + 300,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 4 + 300 - 2,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 5 + 700 - 2,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 6 + 700 - 4,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 10 + 700 - 4,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 11 + 700 - 6,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 12 + 700 - 8,
            y: 470,
            image: platformImage
        }),
        new Platform({
            x: platformImage.width * 18 + 700 - 8,
            y: 470,
            image: platformImage
        })
    ]
    genericObjects = [
        new GenericObject({
        x: -1,
        y: -1,
        image: createImage(background)
        }),
        new GenericObject({
        x: -1,
        y: -1,
        image: createImage(hills)
        })
    ]

    scrollOffset = 0
    currentScore = 0
}

function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    genericObjects.forEach((genericObject) => {
      genericObject.draw()
    })

    platforms.forEach((platform) => {
        platform.draw()
    })
    player.update()

    if(keys.right.pressed && player.position.x < 400) {
        player.velocity.x = player.speed
    } else if((keys.left.pressed && player.position.x > 100)
            || (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)) {
        player.velocity.x = -player.speed
    } else {
        player.velocity.x = 0

        if(keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.position.x -= player.speed
            })
            genericObjects.forEach((genericObject) => {
              genericObject.position.x -= player.speed * 0.66
            })
        } else if(keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })
            genericObjects.forEach((genericObject) => {
              genericObject.position.x += player.speed * 0.66
            })
        }
    }

    //platform collision detection
    platforms.forEach((platform) => {
        if(player.position.y + player.height <= platform.position.y
            && player.position.y + player.height + player.velocity.y >= platform.position.y
            && player.position.x + player.width >= platform.position.x
            && player.position.x <= platform.position.x + platform.width) {
            player.velocity.y = 0
        }
    })

    //sprite switching
    if(keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.run.right) {
        player.frames = 1
        player.currentSprite = player.sprites.run.right
        player.curruntCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    } else if (keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.run.left) {
        player.currentSprite = player.sprites.run.left
        player.curruntCropWidth = player.sprites.run.cropWidth
        player.width = player.sprites.run.width
    } else if (!keys.left.pressed && lastKey === 'left' && player.currentSprite !== player.sprites.stand.left) {
        player.currentSprite = player.sprites.stand.left
        player.curruntCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    } else if (!keys.right.pressed && lastKey === 'right' && player.currentSprite !== player.sprites.stand.right) {
        player.currentSprite = player.sprites.stand.right
        player.curruntCropWidth = player.sprites.stand.cropWidth
        player.width = player.sprites.stand.width
    }

    //win condition
    if(scrollOffset > platformImage.width * 5 + 300 - 2) {
        console.log('you win')
    }

    //lose condition
    if(player.position.y > canvas.height) {
        isAlive = false
        keys.left.pressed = false
        keys.right.pressed = false
        displayScore()
        //init()
    }

    c.strokeStyle = "#fff";
    c.font = "30pt Supermercado One";
    if(currentScore < Math.round(scrollOffset / 100)) {
        currentScore = Math.round(scrollOffset / 100)
    }
    if(recordScore < currentScore) {
        recordScore = currentScore
    }
    c.fillText(`Record: ${recordScore}`, 20, 50)
    c.fillText(`Score: ${currentScore}`, 20, 100)
}

//start screen
const btn = document.querySelector('.btn')
const start = document.querySelector('.start')
btn.addEventListener('click', startScreen)

function startScreen() {
    init()
    animate()
    start.classList.add('hide')
    start.style.backgroundImage = 'none'
    start.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'
    btn.innerHTML = '<p>RESTART</p>'
    console.log(btn.innerHTML)
    btn.removeEventListener('click', startScreen)
    btn.addEventListener('click', restart)
}

function displayScore() {
    start.classList.remove('hide')
}

function restart() {
    init()
    start.classList.add('hide')
}



//init()
//animate()

window.addEventListener('keydown', ({code}) => {
    switch(code) {
        case 'KeyA':
            if(!keys.right.pressed && isAlive) {
                keys.left.pressed = true
                lastKey = 'left'
            }
            break

        case 'KeyD':
            if(!keys.left.pressed && isAlive) {
                keys.right.pressed = true
                lastKey = 'right'
            }
            break

        case 'Space':
            if(player.velocity.y === 0 && isAlive) {
                player.velocity.y -= 25
            }
            break

        case 'KeyS':
            break
    }
})

window.addEventListener('keyup', ({code}) => {
    switch(code) {
        case 'KeyA':
            keys.left.pressed = false
            break
        case 'KeyD':
            keys.right.pressed = false
            break
        case 'Space':
            break
        case 'KeyS':
            break
    }
})