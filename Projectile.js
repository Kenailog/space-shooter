class Projectile {
    constructor(position, fromCanon) {
        this.position = position
        this.size = { width: 3, height: 30 }
        this.velocity = 15
        this.fromCanon = fromCanon
    }

    move(direction) {
        switch (direction) {
            case 1:
                this.position.y -= this.velocity
                if (this.fromCanon === -1) {
                    this.position.x += .6
                } else if (this.fromCanon === 1) {
                    this.position.x -= .6
                }
                break
            case -1:
                this.position.y += this.velocity
                break
            default:
                break
        }
    }

    toErase() {
        if (this.position.y < 0 || this.position.y > height) { // or enemy hit
            return true
        }

        return false
    }
}