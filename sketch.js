let player
let enemies = []
let enemyShootSound
let playerShootSound
let stars = []

function preload() {
    enemyShootSound = loadSound('sounds/enemy/shoot.mp3')
    playerShootSound = loadSound('sounds/player/shoot.mp3')
}

function setup() {
    createCanvas(1900, 900)

    for (let i = 0; i < 150; i++) {
        stars.push(new Star())
    }

    player = new Player({ x: 800, y: 750 }, { width: 51.76, height: 53.4 })
    for (let i = 0; i < 10; i++) {
        enemies.push(new Enemy())
    }

    enemies.forEach(enemy => enemy.init())
}

function draw() {
    background(0)

    stars.forEach(star => {
        Engine.draw(star)
        star.update()
    })

    player.projectiles.forEach(projectile => {
        Engine.draw(projectile)
        projectile.move(1)
        if (projectile.toErase()) {
            Engine.erase(projectile, player.projectiles)
        }
    })

    Engine.draw(player)
    player.move()

    enemies.forEach(enemy => {
        Engine.draw(enemy)
        enemy.move()
        if (player.position.x >= enemy.position.x - enemy.shootOffset
            && player.position.x <= enemy.position.x + enemy.shootOffset
            && enemy.shootTimer === 0) {
            enemy.shoot()
            enemyShootSound.play()
            enemy.shootTimer = enemy.timers.shoot
        }

        if (enemy.shootTimer > 0) {
            enemy.shootTimer--
        }

        enemy.projectiles.forEach(projectile => {
            Engine.draw(projectile)
            projectile.move(-1)
            if (projectile.toErase()) {
                Engine.erase(projectile, enemy.projectiles)
            }
        })

        Engine.turnOnCollision(enemy)
    })

    Engine.turnOnCollision(player)
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        player.direction = - 1
    } else if (keyCode === RIGHT_ARROW) {
        player.direction = 1
    } else if (keyCode === DOWN_ARROW) {
        player.direction = 0
    }

    if (keyCode === CONTROL) {
        player.shoot()
        playerShootSound.play()
    }
}