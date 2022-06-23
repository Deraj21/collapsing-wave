import Map from './scripts/Map.js'
import { H, W } from './scripts/globals.js'
import { randomFromList } from './scripts/utils.js'

// prototypes
Array.prototype.compare = function(arr) {
    return this.filter(val => {
        return arr.includes(val)
    })
}

Array.prototype.filterDuplicates = function() {
    let newArray = []
    this.forEach(item => {
        if (newArray.includes(item)){

        } else {
            newArray.push(item)
        }
    })

    return newArray
}


const n = 20

let map = new Map(n, n)


