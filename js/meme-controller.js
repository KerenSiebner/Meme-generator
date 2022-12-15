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
        linesTxt.reduce((acc, lineTxt) => {
            console.log('acc', acc)
            drawText(`${lineTxt}`, gElCanvas.width * 0.5, acc)
            if (acc === 100) acc = gElCanvas.height - 100
            else if (acc === (gElCanvas.height - 100)) acc = gElCanvas.height * 0.5
            return acc
        }, 100)
        // if(gFocusRects!== []){
        //     const selectedLineIdx = +gMeme.selectedLineIdx
        //     console.log('gFocusRects[selectedLineIdx]', gFocusRects[0])
            // const {startX, startY, endX, endY} = gFocusRects[selectedLineIdx]
            const {startX, startY, endX, endY} = gFocusRect
            drawFocusRect(startX, startY, endX, endY)
        // }
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
    gFocusRects.push(gFocusRect)
    gFocusRect = {}
    addLine()
    renderMeme()
    console.log('gFocusRects', gFocusRects)
}

function onSwitchFocusLine() {
    switchFocusLine()
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

function onMoveUp(){
    moveUp()
    renderMeme()
}

function onMoveDown(){
    moveDown()
    renderMeme()
}

function onDownload(elLink){
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onShare(){
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') // Gets the canvas content as an image format

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        // Encode the instance of certain characters in the url
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    // Send the image to the server
    shareImg(imgDataUrl, onSuccess)
}