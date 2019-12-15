class Engine {
    static draw(object) {
        noFill()
        stroke(0, 180, 0)

        if (object instanceof Enemy) {
            const wingWidth = 8 * object.size.width / 100
            const cabinDiameter = 25 * object.size.width / 100
            rect(object.position.x, object.position.y, wingWidth, object.size.height)
            rect(object.position.x + 3, object.position.y + object.size.height / 2 - 3, 8, 3)
            circle(object.position.x + 15, object.position.y + object.size.height / 2 - 1.5, cabinDiameter)
            rect(object.position.x + 18, object.position.y + object.size.height / 2 - 3, 8, 3)
            rect(object.position.x + 26, object.position.y, wingWidth, object.size.height)
        } else if (object instanceof Player) {
            const wingWidth = 8 * object.size.width / 100
            const wingHeight = object.size.height - 10
            rect(object.position.x, object.position.y + 20, wingWidth, wingHeight)
            rect(object.position.x + wingWidth, object.position.y + object.size.height, object.size.width / 3, wingWidth)
            rect(object.position.x + wingWidth + object.size.width / 3, object.position.y, wingWidth, object.size.height)
            rect(object.position.x + 2 * wingWidth + object.size.width / 3, object.position.y + object.size.height, object.size.width / 3, wingWidth)
            rect(object.position.x + 2 * wingWidth + 2 * object.size.width / 3, object.position.y + 20, wingWidth, wingHeight)
        } else if (object instanceof Projectile) {
            rect(object.position.x, object.position.y, object.size.width, object.size.height)
        } else if (object instanceof Star) {
            push()
            translate(width / 2, height / 2)
            const sx = map(object.x / object.z, 0, 1, 0, width)
            const sy = map(object.y / object.z, 0, 1, 0, height)
            const r = map(object.z, 0, width, 8, 0)
            circle(sx, sy, r)
            const px = map(object.x / object.pz, 0, 1, 0, width)
            const py = map(object.y / object.pz, 0, 1, 0, height)
            object.pz = object.z
            line(px, py, sx, sy)
            pop()
        }
    }

    static erase(object, objects) {
        const toRemove = objects.indexOf(object)
        objects.splice(toRemove, 1)
    }

    static turnOnCollision(object) {
        if (object.position.x < 0) {
            object.position.x = 0
            object.direction = 0
        } else if (object.position.x > width - object.size.width) {
            object.position.x = width - object.size.width
            object.direction = 0
        } else if (object.position.y < 0) {
            object.position.y = 0
            object.direction = 0
        }

        if (object instanceof Enemy && object.position.y >= height - 350) {
            object.position.y = height - 350
            object.direction = 0
        }
    }

    static renderText(string, size, position, color) {
        fill(color)
        textSize(size)
        text(string, position.x, position.y)
    }
}