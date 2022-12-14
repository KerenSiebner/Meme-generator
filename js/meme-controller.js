'use-strict'
let gElCanvas
let gCtx

function onInit(){
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallary()
}

//TODO-1: render image on the canvas and a line of text on top
function renderMeme(){
    const elImg = new Image() // Create a new html img element
    elImg.src = getImg() // Send a network req to get that image, define the img src
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        drawText(getTxt(), 100, 100)
    }
}

