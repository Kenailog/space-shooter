class Enemy {
    constructor() {
        this.position = createVector(random(0, width), 0)
        this.prev = this.position.copy()
        this.projectiles = []
        this.shootOffset = 6
        this.timers = { shoot: 150 }
        this.velocityNoiseFactor = { x: random(0, 1), y: random(10000, 10001) }
        this.velocity = {}
    }

    init() {
        this.size = { width: 42, height: 41 }
        this.moveTimer = this.timers.move
        this.shootTimer = this.timers.shoot
    }

    shoot() {
        this.projectiles.push(
            new Projectile(
                {
                    x: this.position.x + this.size.width / 2,
                    y: this.position.y + this.size.height
                },
                0
            )
        )
    }

    // move() {
    //     this.prev.set(this.position);
    //     let step = p5.Vector.random2D();
    //     let r = random(80);
    //     if (r < 1) {
    //       step.mult(random(25, 50));
    //     } else {
    //       step.setMag(2);
    //     }

    //     this.position.add(step);      
    // }


    changeVelocity() {
        this.velocity.x = map(noise(this.velocityNoiseFactor.x), 0, 1, 0, width)
        this.velocity.y = map(noise(this.velocityNoiseFactor.y), 0, 1, 0, height)
        this.velocityNoiseFactor.x += random(.002, .006)
        this.velocityNoiseFactor.y += random(.002, .006)
    }

    move() {
        this.changeVelocity()
        this.position.y = this.velocity.y
        this.position.x = this.velocity.x
    }
}