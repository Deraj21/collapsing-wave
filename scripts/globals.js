export const canvas = document.getElementById("canvas")

// Globals
export const
    ctx = canvas.getContext('2d'),
    H = parseFloat(canvas.getAttribute("height")),
    W = parseFloat(canvas.getAttribute("width")),
    STROKE_STYLE = "black",
    FILL_STYLE = "black",
    FONT = {
        size: 40,
        family: "Arial",
        bold: true
    }

ctx.strokeStyle = STROKE_STYLE
ctx.fillStyle = FILL_STYLE
ctx.font = `${FONT.bold ? 'bold ' : ''}${FONT.size}px ${FONT.family}`
