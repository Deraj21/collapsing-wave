import mapData from '../map-data.js'
import { ctx, W, H, FILL_STYLE } from './globals.js'
import { randomFromList } from './utils.js'

class Map {
    constructor(numRows, numCols) {
        this.numRows = numRows
        this.numCols = numCols

        this.board = []

        this.createBoard()
    }

    createBoard() {
        const { numRows, numCols } = this

        for (let r = 0; r < numRows; r++) {
            let row = []
            for (let c = 0; c < numCols; c++) {
                row.push("")
            }
            this.board.push(row)
        }
    }

    generate() {

        this.board.forEach((row, r) => {
            row.forEach((col, c) => {
                let options = [ ...mapData[""].all ]

                let n = this.board[r-1] !== undefined ? this.board[r-1][c] : ""
                let s = this.board[r+1] !== undefined ? this.board[r+1][c] : ""
                let e = this.board[r][c+1] !== undefined ? this.board[r][c+1] : ""
                let w = this.board[r][c-1] !== undefined ? this.board[r][c-1] : ""

                console.log()

                options = options.compare(mapData[n].all)
                options = options.compare(mapData[s].all)
                options = options.compare(mapData[e].all)
                options = options.compare(mapData[w].all)

                this.board[r][c] = randomFromList(options)

            })
        })
    }

    print(useLongNames = false) {
        let print = ``

        this.board.forEach(row => {

            row.forEach(col => {
                print += `'${mapData[col].nickname}' `
                // print += " "
            })
            print += `\n\n`
        })

        console.log(print)
    }

    drawCell(r, c, color){
        const { numCols, numRows } = this
        const w = W / numCols, h = H / numRows
        ctx.fillStyle = color

        ctx.fillRect(
            c * w,
            r * h,
            w,
            h
        )


        ctx.fillStyle = FILL_STYLE
    }

    draw() {
        const { board } = this

        board.forEach((row, r) => {
            row.forEach((col, c) => {

                this.drawCell(r, c, mapData[col].color)

            })
        })
    }

    drawSquare(r, c) {

    }
}

export default Map
