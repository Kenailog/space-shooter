class Star {
    constructor() {
        this.x = random(-width, width)
        this.y = random(-height, height)
        this.z = random(width)
        this.pz = this.z
        this.speed = 25
    }

    update() {
        this.z = this.z - this.speed
        if (this.z < 1) {
            this.z = width
            this.x = random(-width, width)
            this.y = random(-height, height)
            this.pz = this.z
        }
    }
}