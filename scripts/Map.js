import mapData from '../map-data.js'
import { ctx, W, H, FILL_STYLE } from './globals.js'
import { randomFromList } from './utils.js'

class Map {
    constructor(numRows, numCols) {
        this.numRows = numRows
        this.numCols = numCols

        this.board = []

        this.createBoard()
        this.generate()
        // this.draw()
    }

    createBoard() {
        const { numRows, numCols } = this

        for (let r = 0; r < numRows; r++) {
            let row = []
            for (let c = 0; c < numCols; c++) {
                row.push({
                    terrain: "",
                    options: [...mapData[""].all],
                    collapsedThisRound: false
                })
            }
            this.board.push(row)
        }
    }

    findLeastEntropy() {
        const { board } = this

        // get all cells with least entropy
        let min = mapData[""].all.length
        let leastList = []

        board.forEach((row, r) => {
            row.forEach((col, c) => {
                let l = col.options.length
                if (col.terrain) {
                    return
                } else if (l === min) {
                    leastList.push({ r, c })
                } else if (l < min) {
                    min = l
                    leastList = []
                    leastList.push({ r, c })
                }
            })
        })

        // pick a cell at random
        return randomFromList(leastList)
    }

    getNeighborOptions(parentOptions) {
        let newOptions = []

        parentOptions.forEach(o => {
            newOptions = [...newOptions, ...mapData[o].all]
        })

        return newOptions.filterDuplicates()
    }

    collapseNeighbors(r, c, cell) {
        // filter possible options for other cells based on that choice
        // north
        const { terrain, options } = cell
        const { numRows, numCols } = this
        let neighborOptions = this.getNeighborOptions(options)

        let north = null
        if (r - 1 >= 0) {
            north = this.board[r - 1][c]
            if (north.terrain || north.options.length === 1 || north.collapsedThisRound) {
                north = null
            } else {
                north.options = north.options.compare(neighborOptions)
                north.collapsedThisRound = true
            }
        }

        // south
        let south = null
        if (r + 1 < numRows) {
            south = this.board[r + 1][c]
            if (south.terrain || south.options.length === 1 || south.collapsedThisRound) {
                south = null
            } else {
                south.options = south.options.compare(neighborOptions)
                south.collapsedThisRound = true
            }
        }
        
        // east
        let east = null
        if (c + 1 < numCols) {
            east = this.board[r][c + 1]
            if (east.terrain || east.options.length === 1 || east.collapsedThisRound) {
                east = null
            } else {
                east.options = east.options.compare(neighborOptions)
                east.collapsedThisRound = true
            }
        }
        
        // west
        let west = null
        if (c - 1 >= 0) {
            west = this.board[r][c - 1]
            if (west.terrain || west.options.length === 1 || west.collapsedThisRound) {
                west = null
            } else {
                west.options = west.options.compare(neighborOptions)
                west.collapsedThisRound = true
            }
        }
        
        if (north) {
            this.collapseNeighbors(r - 1, c, north)
        }
        if (south) {
            this.collapseNeighbors(r + 1, c, south)
        }
        if (east) {
            this.collapseNeighbors(r, c + 1, east)
        }
        if (west) {
            this.collapseNeighbors(r, c - 1, west)
        }
    }

    generate() {
        const { numCols, numRows } = this

        for (let count = 0; count < numCols * numRows; count++) {

            let coords = this.findLeastEntropy()
            
            let { r, c } = coords
            let cell = this.board[r][c]

            // set terrain type at random from it's list of options
            let terrain = randomFromList(cell.options)
            cell.options = [terrain]
            cell.terrain = terrain

            this.drawCell(r, c, mapData[cell.terrain].color)

            cell.collapsedThisRound = true
            this.collapseNeighbors(r, c, cell)

            this.board.forEach(row => {
                row.forEach(col => {
                    col.collapsedThisRound = false
                })
            })

        }
    }

    printBoard(useLongNames = false) {
        let print = ``

        this.board.forEach(row => {

            row.forEach(col => {
                let name = mapData[col.terrain].nickname
                print += `'${name ? name : "  "}' `
                // print += " "
            })
            print += `\n\n`
        })

        console.log(print)
    }

    drawCell(r, c, color) {
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

                this.drawCell(r, c, mapData[col.terrain].color)

            })
        })
    }

    drawSquare(r, c) {

    }
}

export default Map
