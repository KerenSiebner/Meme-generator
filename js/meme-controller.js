'use-strict'
let gElCanvas
let gCtx
let gIsNewLine=false
let gStartPos
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

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
    addMouseListeners()
    // addTouchListeners()
    // const selectFont = document.querySelector('.font-select')
    // selectFont.addEventListener('select', onChangeFont)
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    // Get the ev pos from mouse or touch
    const pos = getEvPos(ev)
    console.log('pos', pos)
    const lineClickedIndex = lineClickedIdx(pos)
    if (lineClickedIndex ===-1) return
    console.log('lineClickedIndex', lineClickedIndex)
    gMeme.selectedLineIdx = lineClickedIndex
    changePlaceHolderTxt()
    renderMeme()
    // setSelectedDrag(true)
    //Save the pos we start from
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
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
    lines.forEach(line => drawText(`${line.txt}`, line.x, line.y, line.color, line.size, line.fontFamily, line.isUnderline, line.align))
    const selectedLine = lines[meme.selectedLineIdx]
    if (!selectedLine)return
    markSelectedLine(selectedLine)
}

function markSelectedLine(selectedLine) {
    let x= selectedLine.x
    const y= selectedLine.y
    const txt= selectedLine.txt
    if (selectedLine.align === 'left') x = x - 100
    else if (selectedLine.align === 'right') x = x + 100

    const textWidth = gCtx.measureText(txt).width + 20;
    const textHeight = gCtx.measureText(txt).fontBoundingBoxAscent
        + gCtx.measureText(txt).fontBoundingBoxDescent + 20;

    drawFocusRect(x - textWidth / 2, y - textHeight / 2, textWidth, textHeight)

}

function onSetLineTxt(ev) {
    // ev.preventDefault()
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

function onTextAlign(alignBtn) {
    const alignTxt = alignBtn.dataset.align
    setAlignment(alignTxt)
    renderMeme()
}

function onAddLine() {
    gIsNewLine = true
    gFocusRects.push(gFocusRect)
    gFocusRect = {}
    addLine()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}

function onSwitchFocusLine() {
    switchFocusLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
}

function onUnderline() {
    setUnderline()
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

function onChangeFont(font) {
    // const font = ev.target.value
    setFontFamily(`${font}`)
    // drawText(`${txt}`, 100, 100)
    //TODO-4 render the Meme according to the input text
    renderMeme()
}