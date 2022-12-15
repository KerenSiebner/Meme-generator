'use-strict'
let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
    renderGallery()
    addEventListeners()
}

function addEventListeners() {
    const input = document.querySelector('.inputTxt')
    input.addEventListener('input', onSetLineTxt)
    input.addEventListener('input', preventEnterSubmit)
}

//TODO-1: render image on the canvas and a line of text on top
function renderMeme() {
    const elImg = new Image() // Create a new html img element
    elImg.src = getImg() // Send a network req to get that image, define the img src
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        const linesTxt = getTxtLines()
        console.log('linesTxt', linesTxt)
        if (!linesTxt) return
        // drawText(`${linesTxt[0]}`, gElCanvas.width*0.5, 100)
        // if (!linesTxt[1]) return
        // drawText(`${linesTxt[1]}`, gElCanvas.width*0.5, gElCanvas.height-100)
        // console.log('gElCanvas', gElCanvas)

        // for (var i=0; i<linesTxt.length; i++){
        //     console.log('i', i)
        //     const lineTxt = linesTxt[i]
        //     if (i=0) drawText(`${lineTxt}`, gElCanvas.width*0.5, 100)
        //     else if (i=1) drawText(`${lineTxt}`, gElCanvas.width*0.5, gElCanvas.height-100)
        //     else  drawText(`${lineTxt}`, gElCanvas.width*0.5, gElCanvas.height*0.5)
        // }


        linesTxt.reduce((acc, lineTxt) => {
            console.log('acc', acc)
            drawText(`${lineTxt}`, gElCanvas.width * 0.5, acc)
            if (acc = 100) acc = gElCanvas.height - 100
            else if (acc = gElCanvas.height - 100) acc = gElCanvas.height * 0.5
            const { startX, startY, endX, endY } = gFocusRect
            drawFocusRect(startX, startY, endX, endY)
            return acc
        }, 100)
    }
}
function onSetLineTxt(ev) {
    // ev.preventDefault()
    console.log('ev', ev)
    const txt = ev.target.value
    setLineTxt(`${txt}`)
    // drawText(`${txt}`, 100, 100)
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

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onSave() {
    gIsGallary = true
    toggleDisplayEditorOrGallary()
}

function preventEnterSubmit(ev) {
    ev.preventDefault()
}