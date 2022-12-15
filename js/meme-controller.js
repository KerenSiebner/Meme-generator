'use-strict'
let gElCanvas
let gCtx

function onInit() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addEventListeners()
    renderMeme()
    renderGallery()
}

function addEventListeners() {
    const input = document.querySelector('.inputTxt')
    input.addEventListener('input', onSetLineTxt)
    input.addEventListener('input', preventEnterSubmit)

    const selectFont = document.querySelector('.font-select')
    selectFont.addEventListener('select', onChangeFont)
}

//TODO-1: render image on the canvas and a line of text on top
function renderMeme() {
    const elImg = new Image() // Create a new html img element
    elImg.src = getImg() // Send a network req to get that image, define the img src
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

    const meme = getMeme()
    // console.log('meme', meme)
    const lines = meme.lines
    // console.log('lines', lines)
    if (lines.length === 0) return
    lines.forEach(line => drawText(`${line.txt}`, line.x, line.y))
    const selectedLine = lines[meme.selectedLineIdx]
    markSelectedLine(selectedLine)
}

function markSelectedLine(selectedLine) {
    const textWidth = gCtx.measureText(selectedLine.txt).width + 10;
    const textHeight = gCtx.measureText(selectedLine.txt).fontBoundingBoxAscent
        + gCtx.measureText(selectedLine.txt).fontBoundingBoxDescent;

    drawFocusRect(selectedLine.x - textWidth / 2, selectedLine.y - textHeight / 2, textWidth, textHeight)

}

function onSetLineTxt(ev) {
    // ev.preventDefault()
    console.log('ev', ev)
    const txt = ev.target.value
    setLineTxt(`${txt}`)
    setSelectedLine()
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

function onMoveUp() {
    moveUp()
    renderMeme()
}

function onMoveDown() {
    moveDown()
    renderMeme()
}

function onDownload(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onShare() {
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

function onChangeFont(ev) {
    const font = ev.target.value
    setFontFamily(`${font}`)
    // drawText(`${txt}`, 100, 100)
    //TODO-4 render the Meme according to the input text
    renderMeme()
}