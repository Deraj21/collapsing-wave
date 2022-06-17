import Map from './scripts/Map.js'
import { H, W } from './scripts/globals.js'
import { randomFromList } from './scripts/utils.js'

// prototypes
Array.prototype.compare = function(arr) {
    return this.filter(val => {
        return arr.includes(val)
    })
}

let map = new Map(50, 50)
