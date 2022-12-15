'use-strict'

var gFocusRect = {}
var gFocusRects = []
var gNumberOfLinesEdited = 0

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
    //     {
    //     txt:'TEXT GOES HERE',
    //     size: 30,
    //     align: 'center',
    //     color: 'white',
    //     fontFamily: 'impact',
    //     x,
    //     y
    // },
    // {
    //     txt:'TEXT GOES HERE',
    //     size: 30,
    //     align: 'center',
    //     color: 'white',
    //     fontFamily: 'impact',
    //     x,
    //     y
    // }]
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
        const numberOfLines = gMeme.lines.length
        let x = gElCanvas.width * 0.5
        let y = gElCanvas.height / 2
        if (numberOfLines === 0) y = 100
        else if (numberOfLines === 1) y = gElCanvas.height - 100
        gMeme.lines.unshift(_createLine(inputTxt.toUpperCase(), x, y))
    } else {
        // const lastLineIdx = gMeme.lines.length - 1
        gMeme.lines[0].txt = inputTxt.toUpperCase()
    }
}

// if (i = 0) drawText(`${linesTxt[i]}`, gElCanvas.width * 0.5, 100)
// else if (i = 1) drawText(`${linesTxt[i]}`, gElCanvas.width * 0.5, gElCanvas.height - 100)

function _createLine(txt, x, y) {
    return line =
    {
        txt,
        size: 30,
        align: 'center',
        color: 'white',
        fontFamily: 'impact',
        x,
        y
    }
}

function addLine() {
    gNumberOfLinesEdited++
    clearInputTxt()
    const memeLines = gMeme.lines
    memeLines[memeLines.length - 1].isSelected = false
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
    gCtx.font = `${gMeme.lines[0].size}px ${gMeme.lines[0].fontFamily}`;
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
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

function moveUp() {
    const selectedLineIdx = gMeme.selectedLineIdx

}

function moveDown() {

}


function switchFocusLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
}

function setFontFamily(fontFamily) {
    gMeme.lines.fontFamily = fontFamily
}


function setSelectedLine() {
    gMeme.lines[gMeme.lines.length - 1].isSelected = true
}



// const newFocusRect = gFocusRects[0]
// const { startX, startY, endX, endY } =newFocusRect
// gFocusRect.startX=startX
// gFocusRect.startY=startY
// gFocusRect.endX=endX
// gFocusRect.endY=endY
// console.log('newFocusRect', newFocusRect)
// console.log('gFocusRects', gFocusRects)
// console.log('gFocusRect', gFocusRect)

// const txtLines = getTxtLines()
// console.log('txtLines', txtLines)
// const newTxtLinesOrder = txtLines.reverse()
// console.log('newTxtLinesOrder', newTxtLinesOrder)
// gMeme.lines = newTxtLinesOrder