'use-strict'
let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addEventListeners()
    renderMeme()
    renderGallary()
}

function addEventListeners(){
    const inputTxt = document.querySelector('.inputTxt')
    inputTxt.addEventListener('.inputTxt',onSetLineTxt)
    // console.log('inputTxt.value', inputTxt.value)
}

//TODO-1: render image on the canvas and a line of text on top
function renderMeme() {
    const elImg = new Image() // Create a new html img element
    elImg.src = getImg() // Send a network req to get that image, define the img src
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        const linesTxt = getTxtLines()
        if (!linesTxt) return
        console.log('gElCanvas', gElCanvas) 
        linesTxt.reduce((acc, lineTxt) => {
            // if(acc>(gElCanvas.height-100)) return alert('No more text can be added!')
            drawText(`${lineTxt}`, 100, 100 + acc)
            return acc + 100
        }, 0)
    }
}
function onSetLineTxt(ev) {
    // ev.preventDefault()
    console.log('ev.target.value', ev.target.value)
    setLineTxt(ev.taget.value)
    //TODO-4 render the Meme according to the input text
    renderMeme()
}

function onSetFontColor(color) {
    setFontColor(color)
    renderMeme()
}

function onSetFontSize(fontChangeSize) {
    setFontSize(fontChangeSize)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine(){
    switchLine()
    renderMeme()
}