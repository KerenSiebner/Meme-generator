'use-strict'

var gFocusRect = {}

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['puppy', 'pets'] },
    { id: 3, url: 'img/3.jpg', keywords: ['puppy', 'pets', 'baby'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'pets'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'funny'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'comady'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'funny', 'comady'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'comady'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'funny'] },
    { id: 10, url: 'img/10.jpg', keywords: ['politics', 'funny'] },
]

var gMeme = {
    selectedImgId: 2,
    selectedLineIdx: 0,
    lines: []
}

// TODO-2 
function getMeme() {
    return gMeme
}

function getImg() {
    const imgIdx = gMeme.selectedImgId
    const imgSelected = gImgs.find(({ id }) => id === imgIdx)
    const imgUrl = imgSelected.url
    return imgUrl
}

function getImgs() {
    return gImgs
}

function getTxtLines() {
    if (gMeme.lines === []) return null
    const txtLines = gMeme.lines.map(line => line.txt)
    console.log('txtLines', txtLines)
    return txtLines
}

//TODO-3 update gMeme from user input
function setLineTxt(inputTxt) {
    //first letter create new line
    if (inputTxt.length === 1) {
        gMeme.lines.push(_createLine(inputTxt.toUpperCase()))
    } else {
        const lastLineIdx = gMeme.lines.length - 1
        gMeme.lines[lastLineIdx].txt = inputTxt.toUpperCase()
    }
}

function _createLine(txt) {
    return line =
    {
        txt,
        size: 30,
        align: 'center',
        color: 'white'
    }
}

function addLine() {
    clearInputTxt()
}

function switchLine() {
    const numberOfLines = gMeme.lines.length
    if (numberOfLines < 1) return
    else {
        //switch between first and last line
        const firstLine = gMeme.lines[0]
        const lastLine = gMeme.lines[numberOfLines - 1]
        gMeme.lines[0] = lastLine
        gMeme.lines[numberOfLines - 1] = firstLine
    }
}

function clearInputTxt() {
    var elTxt = document.querySelector('.inputTxt')
    // console.log('elTxt.value', elTxt.value)
    if (elTxt.value != "") elTxt.value = ""
}

function setFontColor(color) {
    gMeme.lines[0].color = color
}

function setFontSize(fontChangeSize) {
    //if increase
    if (fontChangeSize.dataset.fsize === '+') { gMeme.lines[0].size += 5 }
    else { gMeme.lines[0].size -= 5 }
}

function drawText(text, x, y) {
    // gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = gMeme.lines[0].color
    gCtx.font = `${gMeme.lines[0].size}px impact`;
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
    // gCtx.closePath()
    const textWidth = gCtx.measureText(text).width + 10;
    const textHeight = gCtx.measureText(text).fontBoundingBoxAscent
        + gCtx.measureText(text).fontBoundingBoxDescent;

    // if (gFocusRect && text.length === 1)
    gFocusRect.startX = x - textWidth / 2
    gFocusRect.startY = y - textHeight / 2
    gFocusRect.endX = textWidth
    gFocusRect.endY = textHeight

    // drawFocusRect(x - textWidth * 0.5, y - 0.5 * textHeight, textWidth, textHeight)
}

function clearCanvasLines() {
    gMeme.lines = []
}

// function createImgs() {

// }

function drawFocusRect(x, y, textWidth, textHeight) {
    gCtx.strokeStyle = 'grey'
    gCtx.strokeRect(x, y, textWidth, textHeight)
    // return gFocusRect
}
