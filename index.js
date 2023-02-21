const platform = 'img/platform.png'
const hills = 'img/hills.png'
const background = 'img/background.png'
const platformSmallTall = 'img/platformSmallTall.png'
const door = 'img/door.png'

const platform1 = 'img/platform1.png'
const hills1 = 'img/hills1.png'
const background1 = 'img/background1.png'
const platformSmallTall1 = 'img/platformSmallTall1.png'
const door1 = 'img/door1.png'

const platform2 = 'img/platform2.png'
const hills2 = 'img/hills2.png'
const background2 = 'img/background2.png'
const platformSmallTall2 = 'img/platformSmallTall2.png'
const door2 = 'img/door2.png'

const spriteRunLeft = 'img/spriteRunLeft.png'
const spriteRunRight = 'img/spriteRunRight.png'
const spriteStandLeft = 'img/spriteStandLeft.png'
const spriteStandRight = 'img/spriteStandRight.png'

const mutagen = 'img/mutagen.png'

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//document.oncontextmenu = () => false

canvas.width = 1024
canvas.height = 576

const gravity = 1.5

class Player {
    constructor() {
        this.speed = 10
        this.position = {
            x: 100,
            y: 324
        }
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 55
        this.height = 146
        
        this.image = createImage(spriteStandRight)
        this.frames = 0
        this.sprites = {
          stand: {
            right: createImage(spriteStandRight),
            left: createImage(spriteStandLeft),
            cropWidth: 150,
            width: 55
          },
          run: {
            right: createImage(spriteRunRight),
            left: createImage(spriteRunLeft),
            cropWidth: 340,
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
        this.position.y + 2,
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

class DoorObject {
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

class Colb {
    constructor({x, y, image}) {
        this.position = {
            x,
            y
        }

        this.image = image
        this.width = 50
        this.height = 72

        this.isCollected = false

        this.frames = 0
        this.spriteCropWidth = 50
    }

    draw() {
        c.drawImage(
          this.image,
          this.spriteCropWidth * this.frames,
          0,
          this.spriteCropWidth,
          72,
          this.position.x,
          this.position.y,
          this.width,
          this.height
        )
      }
  
      update() {
          this.frames++
          if(this.frames > 59) {
            this.frames = 0
          }
  
          this.draw()
      }
}

function createImage(imageSrc) {
    const image = new Image()
    image.src = imageSrc
    return image
}

let platformImage = createImage(platform)
let platformSmallTallImage = createImage(platformSmallTall)
let doorImage = createImage(door)
let mutagenImage = createImage(mutagen)

let platformImage1 = createImage(platform1)
let platformSmallTallImage1 = createImage(platformSmallTall1)
let doorImage1 = createImage(door1)

let platformImage2 = createImage(platform2)
let platformSmallTallImage2 = createImage(platformSmallTall2)
let doorImage2 = createImage(door2)

let player
let platforms = []
let genericObjects = []
let doorObject
let colbs = []

let time
let timeText

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
let collectedColbs = 0
let level = 1
let colbsForLevel = 5
let isAlive = false

function init() {
    isAlive = true

    platforms = []
    genericObjects = []
    colbs = []

    if(level == 1) {
        platforms = [
            new Platform({
                x: 867,
                y: 287,
                image: platformSmallTallImage
            }),
            new Platform({
                x: 2545,
                y: 287,
                image: platformSmallTallImage
            }),
            new Platform({
                x: 2834,
                y: 287,
                image: platformSmallTallImage
            }),
            new Platform({
                x: 3440,
                y: 287,
                image: platformSmallTallImage
            }),
            new Platform({
                x: 3989,
                y: 287,
                image: platformSmallTallImage
            }),
            new Platform({
                x: 5758,
                y: 287,
                image: platformSmallTallImage
            }),
            new Platform({
                x: 7648,
                y: 287,
                image: platformSmallTallImage
            }),
            new Platform({
                x: 9999,
                y: 287,
                image: platformSmallTallImage
            }),
            new Platform({
                x: 10589,
                y: 287,
                image: platformSmallTallImage
            }),
            //big platforms
            new Platform({
                x: 0,
                y: 470,
                image: platformImage
            }), 
            new Platform({
                x: 578,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 1307,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 1967,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 2545,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 3440,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 4018,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 4772,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 5528,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 6106,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 6925,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 7503,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 8341,
                y: 470,
                image: platformImage
            }),
            new Platform({
                x: 9304,
                y: 470,
                image: platformImage
            })
        ]
        genericObjects = [
            new GenericObject({
            x: 0,
            y: 0,
            image: createImage(background)
            }),
            new GenericObject({
            x: 0,
            y: 0,
            image: createImage(hills)
            })
        ]
        doorObject = new DoorObject({
            x: 10664,
            y: 88,
            image: doorImage
        })
        colbs = [
            new Colb({
            x: 643,
            y: 423 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 2954,
            y: 423 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 4108,
            y: 240 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 5877,
            y: 240 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 7767,
            y: 423 - 48,
            image: mutagenImage
            })
        ]

        colbsForLevel = 5
    }else if (level == 2) {
        platforms = [
            new Platform({
                x: 289,
                y: 287,
                image: platformSmallTallImage1
            }),
            new Platform({
                x: 1636,
                y: 287,
                image: platformSmallTallImage1
            }),
            new Platform({
                x: 2607,
                y: 130,
                image: platformSmallTallImage1
            }),
            new Platform({
                x: 3137,
                y: 287,
                image: platformSmallTallImage1
            }),
            new Platform({
                x: 3725,
                y: 287,
                image: platformSmallTallImage1
            }),
            new Platform({
                x: 4180,
                y: 470,
                image: platformSmallTallImage1
            }),
            new Platform({
                x: 5840,
                y: 470,
                image: platformSmallTallImage1
            }),
            new Platform({
                x: 6285,
                y: 470,
                image: platformSmallTallImage1
            }),
            new Platform({
                x: 7293,
                y: 287,
                image: platformSmallTallImage1
            }),
            new Platform({
                x: 7819,
                y: 287,
                image: platformSmallTallImage1
            }),
            new Platform({
                x: 8678,
                y: 287,
                image: platformSmallTallImage1
            }),
            //big platforms
            new Platform({
                x: 0,
                y: 470,
                image: platformImage1
            }), 
            new Platform({
                x: 807,
                y: 287,
                image: platformImage1
            }),
            new Platform({
                x: 1636,
                y: 470,
                image: platformImage1
            }),
            new Platform({
                x: 2462,
                y: 470,
                image: platformImage1
            }),
            new Platform({
                x: 4676,
                y: 470,
                image: platformImage1
            }),
            new Platform({
                x: 4965,
                y: 287,
                image: platformImage1
            }),
            new Platform({
                x: 5695,
                y: 176,
                image: platformImage1
            }),
            new Platform({
                x: 6429,
                y: 287,
                image: platformImage1
            }),
            new Platform({
                x: 8389,
                y: 470,
                image: platformImage1
            }),
            new Platform({
                x: 9348,
                y: 470,
                image: platformImage1
            })
        ]
        genericObjects = [
            new GenericObject({
            x: 0,
            y: 0,
            image: createImage(background1)
            }),
            new GenericObject({
            x: 0,
            y: 0,
            image: createImage(hills1)
            })
        ]
        doorObject = new DoorObject({
            x: 9568,
            y: 270,
            image: doorImage1
        })
        colbs = [
            new Colb({
            x: 669,
            y: 239 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 2726,
            y: 82 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 4231,
            y: 200 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 5080,
            y: 423 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 5960,
            y: 423 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 7582,
            y: 82 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 9300,
            y: 150 - 48,
            image: mutagenImage
            })
        ]

        colbsForLevel = 7
    }else{
        platforms = [
            new Platform({
                x: 578,
                y: 287,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 1066,
                y: 158,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 1693,
                y: 272,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 2203,
                y: 95,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 2825,
                y: 45,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 3441,
                y: 45,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 4661,
                y: 158,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 5208,
                y: 470,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 5497,
                y: 359,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 5786,
                y: 246,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 6075,
                y: 134,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 6364,
                y: 64,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 7773,
                y: 175,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 9149,
                y: 351,
                image: platformSmallTallImage2
            }),
            new Platform({
                x: 9590,
                y: 204,
                image: platformSmallTallImage2
            }),
            //big platforms
            new Platform({
                x: 0,
                y: 470,
                image: platformImage2
            }), 
            new Platform({
                x: 578,
                y: 470,
                image: platformImage2
            }),
            new Platform({
                x: 2059,
                y: 470,
                image: platformImage2
            }),
            new Platform({
                x: 2894,
                y: 470,
                image: platformImage2
            }),
            new Platform({
                x: 3610,
                y: 470,
                image: platformImage2
            }),
            new Platform({
                x: 3852,
                y: 265,
                image: platformImage2
            }),
            new Platform({
                x: 6075,
                y: 470,
                image: platformImage2
            }),
            new Platform({
                x: 6751,
                y: 470,
                image: platformImage2
            }),
            new Platform({
                x: 7484,
                y: 308,
                image: platformImage2
            }),
            new Platform({
                x: 8413,
                y: 470,
                image: platformImage2
            })
        ]
        genericObjects = [
            new GenericObject({
            x: 0,
            y: 0,
            image: createImage(background2)
            }),
            new GenericObject({
            x: 0,
            y: 0,
            image: createImage(hills2)
            })
        ]
        doorObject = new DoorObject({
            x: 9665,
            y: 4,
            image: doorImage2
        })
        colbs = [
            new Colb({
            x: 409,
            y: 423 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 977,
            y: 423 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 2298,
            y: 422 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 2944,
            y: 0 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 4138,
            y: 423 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 4781,
            y: 112 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 5906,
            y: 200 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 6195,
            y: 423 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 6901,
            y: 201 - 48,
            image: mutagenImage
            }),
            new Colb({
            x: 8410,
            y: 142 - 48,
            image: mutagenImage
            })
        ]

        colbsForLevel = 10
    }

    player = new Player()

    scrollOffset = 0
    collectedColbs = 0
}

function animate() {
    let colbsTextColor
    if(level == 1){
        c.fillStyle = '#112533'
        colbsTextColor = '#04d462ea'
    } else if(level == 2) {
        c.fillStyle = '#b4cdde'
        colbsTextColor = 'white'
    } else {
        c.fillStyle = '#3e0100'
        colbsTextColor = 'white'
    }
    requestAnimationFrame(animate)
    c.fillRect(0, 0, canvas.width, canvas.height)
    
    genericObjects.forEach((genericObject) => {
      genericObject.draw()
    })
    
    platforms.forEach((platform) => {
        platform.draw()
    })

    doorObject.draw()

    colbs.forEach((colb) => {
        if(!colb.isCollected){
            colb.update()
        }
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

            doorObject.position.x -= player.speed

            colbs.forEach((colb) => {
                if(!colb.isCollected){
                    colb.position.x -= player.speed
                }
            })
        } else if(keys.left.pressed && scrollOffset > 0) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.position.x += player.speed
            })

            genericObjects.forEach((genericObject) => {
              genericObject.position.x += player.speed * 0.66
            })

            doorObject.position.x += player.speed
            
            colbs.forEach((colb) => {
                if(!colb.isCollected){
                    colb.position.x += player.speed
                }
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

    //doorObject collision detection
    if(player.position.y >= doorObject.position.y
        && player.position.y + player.height <= doorObject.position.y + doorObject.height
        && player.position.x >= doorObject.position.x
        && player.position.x + player.width <= doorObject.position.x + doorObject.width) {
            if(collectedColbs == colbsForLevel && isAlive){
                if(level < 3) {
                    level++
                    init()
                }else{
                    isAlive = false
                    level++
                    endGame()
                }
            }else {
                colbsTextColor = '#d42304ea'
            }
    }

    //colbs collision detection
    colbs.forEach((colb) => {
        if(player.position.x + player.width >= colb.position.x + colb.width / 2
            && player.position.y + player.height >= colb.position.y + colb.height / 2
            && player.position.x <= colb.position.x + colb.width - colb.width / 2
            && player.position.y <= colb.position.y + colb.height - colb.height / 2 
            && !colb.isCollected) {
                collectedColbs++
                colb.isCollected = true
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

    //lose condition
    if(player.position.y > canvas.height) {
        isAlive = false
        keys.left.pressed = false
        keys.right.pressed = false
        displayScore()
        //init()
    }

    //print score
    c.font = "30pt Supermercado One";

    if(level == 1){
        c.fillStyle = '#04d462ea'
    } else {
        c.fillStyle = 'white'
    }
    c.fillText(`Level ${level}`, 850, 60)
    let timeNumber = Math.floor((new Date().getTime() - time) / 1000)
    
    let minutes
    if(timeNumber < 10) {
        timeText = `00:0${timeNumber}`
    } else if (timeNumber < 60) {
        timeText = `00:${timeNumber}`
    } else if (timeNumber < 600){
        minutes = Math.floor(timeNumber / 60)
        timeNumber = timeNumber - minutes * 60
        if(minutes < 10) {
            timeText = `0${minutes}:${(timeNumber < 10)? '0' + timeNumber : timeNumber}`
        } else {
            timeText = `${minutes}:${(timeNumber < 10)? '0' + timeNumber : timeNumber}`
        }
    }
    c.fillText(`${timeText}`, 850, 110)
    c.fillStyle = colbsTextColor
    c.fillText(`Mutagen: ${collectedColbs}/${colbsForLevel}`, 50, 60)
}

//start screen
const btn = document.querySelector('.btn')
const start = document.querySelector('.start')
btn.addEventListener('click', startScreen)

function startScreen() {
    const audio = new Audio()
    audio.src = '31842.mp3'

    audio.volume = 0.1
    audio.loop = true
    audio.addEventListener('loadeddata', function() {
        loaded = true;
        audio.play();
    }, false);

    init()
    animate()

    time = new Date().getTime()

    start.classList.add('hide')
    start.style.backgroundImage = 'none'
    start.style.backgroundColor = '#2121219f'
    btn.innerHTML = '<p>RESTART</p>'

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

function endGame() {
    btn.innerHTML = `<p>Woof ${timeText}</p>`
    start.style.backgroundColor = '#212121'
    start.style.boxShadow = '0 0 10px #04d462da'
    btn.removeEventListener('click', restart)
    start.classList.remove('hide')
}

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
            if(!isAlive && level != 4) {
                restart()
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