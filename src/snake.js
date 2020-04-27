const c = document.querySelector("canvas");
const ctx = c.getContext("2d");
const coloumnsQuantity = 20 //кількість колон ан канвасі
const itemSize = c.width / coloumnsQuantity //розмір клітинки 
const score = document.querySelector(".score_num")

export default class Snake {
    constructor() {
        this.snake = [{ x: 0, y: 0 }, { x: 0, y: 0 }]
        this.xDir = 1
        this.yDir = 0
        this.apple = null
        this.interval = null
    }

    draw() {
        ctx.fillStyle = 'green'
        this.snake[this.snake.length - 1].x += itemSize * this.xDir
        this.snake[this.snake.length - 1].y += itemSize * this.yDir

        for (let i = 0; i < this.snake.length; i++) {

            if (this.snake[i + 1]) {
                this.snake[i].x = this.snake[i + 1].x
                this.snake[i].y = this.snake[i + 1].y
            }

            for (let j = 0; j < this.snake.length; j++) {

                if (this.snake[j].x >= c.width) {
                    this.snake[j].x = 0
                } else if (this.snake[j].x < 0) {
                    this.snake[j].x = c.width - itemSize
                } else if (this.snake[j].y >= c.height) {
                    this.snake[j].y = 0
                } else if (this.snake[j].y < 0) {
                    this.snake[j].y = c.height - itemSize
                }

                ctx.fillRect(this.snake[j].x, this.snake[j].y, itemSize, itemSize)
            }
        }
    }

    clear() {
        ctx.clearRect(0, 0, c.width, c.height)
    }

    update() {
        this.clear()
        if (!this.apple) this.createApple()
        this.drawApple()
        this.draw()

        if (this.snake[this.snake.length - 1].x === this.apple.x && this.snake[this.snake.length - 1].y === this.apple.y) {
            this.eatApple()
        }
        this.isBumpCheck()
    }

    directArrow(e) {

        switch (e.code) {
            case "ArrowDown":

                if (this.yDir === -1) {
                    break;
                }

                this.xDir = 0
                this.yDir = 1
                break;
            case "ArrowUp":

                if (this.yDir === 1) {
                    break;
                }

                this.xDir = 0
                this.yDir = -1
                break;
            case "ArrowLeft":

                if (this.xDir === 1) {
                    break;
                }

                this.xDir = -1
                this.yDir = 0
                break;
            case "ArrowRight":

                if (this.xDir === -1) {
                    break;
                }

                this.xDir = 1
                this.yDir = 0
                break;

            default:
                break;
        }
    }

    createApple() {
        const appleX = Math.floor(Math.random() * coloumnsQuantity) * itemSize
        const appleY = Math.floor(Math.random() * coloumnsQuantity) * itemSize
        this.apple = {
            x: appleX,
            y: appleY
        }
    }

    drawApple() {
        ctx.fillStyle = "#FF2525"
        ctx.fillRect(this.apple.x, this.apple.y, itemSize, itemSize)
    }

    grow() {
        let obj = {
            x: null,
            y: null
        }

        this.snake.unshift(obj)
    }

    eatApple() {
        this.createApple()
        this.grow()
        this.changeScore()
    }

    isBumpCheck() {
        for (let k = 0; k < this.snake.length - 3; k++) {
            const isBump = this.snake[k].x === this.snake[this.snake.length - 1].x && this.snake[k].y === this.snake[this.snake.length - 1].y
            if (isBump) {
                this.bump()
            }
        }
    }

    bump() {
        clearInterval(this.interval)
        window.removeEventListener("keydown", () => this.directArrow(event))
        setTimeout(() => this.start(), 3000)
    }

    changeScore() {
        score.innerHTML = this.snake.length - 1
    }

    start() {
        this.snake = [{ x: 0, y: 0 }, { x: 0, y: 0 }]
        this.xDir = 1
        this.yDir = 0
        this.apple = null
        this.internal = null
        score.innerHTML = 1
        window.addEventListener("keydown", () => this.directArrow(event))
        this.interval = setInterval(() => this.update(), 150)
    }
}