class Player {
    constructor(position, size) {
        this.position = position
        this.size = size
        this.velocity = 10
        this.direction = 0
        this.projectiles = []
    }

    move() {
        switch (this.direction) {
            case 0:
                this.position.x = this.position.x
                break
            case 1:
                this.position.x += this.velocity
                break
            case -1:
                this.position.x -= this.velocity
                break
            default:
                break
        }
    }

    shoot() {
        this.projectiles.push(
            new Projectile(
                {
                    x: this.position.x,
                    y: this.position.y - this.size.height + 40
                },
                -1
            )
        )
        this.projectiles.push(
            new Projectile(
                {
                    x: this.position.x + this.size.width - (20 * this.size.width / 100),
                    y: this.position.y - this.size.height + 40
                },
                1
            )
        )
    }
}