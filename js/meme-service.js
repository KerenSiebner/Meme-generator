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
    { id: 11, url: 'img/11.jpg', keywords: ['politics', 'funny'] },
    { id: 12, url: 'img/12.jpg', keywords: ['politics', 'funny'] },
    { id: 13, url: 'img/13.jpg', keywords: ['politics', 'funny'] },
    { id: 14, url: 'img/14.jpg', keywords: ['politics', 'funny'] },
    { id: 15, url: 'img/15.jpg', keywords: ['politics', 'funny'] },
    { id: 16, url: 'img/16.jpg', keywords: ['politics', 'funny'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politics', 'funny'] },
    { id: 18, url: 'img/18.jpg', keywords: ['politics', 'funny'] },
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
        gMeme.lines.push(_createLine(inputTxt.toUpperCase(), x, y))
        gMeme.selectedLineIdx = numberOfLines
    } else {
        // const lastLineIdx = gMeme.lines.length - 1
        gMeme.lines[gMeme.selectedLineIdx].txt = inputTxt.toUpperCase()
    }
}


function _createLine(txt, x, y) {
    return line =
    {
        txt,
        size: 30,
        align: 'center',
        color: 'white',
        fontFamily: 'impact',
        isUnderline:0,
        x,
        y
    }
}

function addLine() {
    gNumberOfLinesEdited++
    clearInputTxt()
    const memeLines = gMeme.lines
    memeLines[gMeme.selectedLineIdx].isSelected = false
}

function  deleteLine(){
    gNumberOfLinesEdited--
    const memeLines = gMeme.lines
    memeLines.splice(gMeme.selectedLineIdx,1)
    gMeme.lines = memeLines
    clearInputTxt()
}


function clearInputTxt() {
    var elTxt = document.querySelector('.inputTxt')
    // console.log('elTxt.value', elTxt.value)
    if (elTxt.value !== "") elTxt.value = ""
}
function changePlaceHolderTxt() {
    var elTxt = document.querySelector('.inputTxt')
    // console.log('elTxt.value', elTxt.value)
    const selectedBoxTxt = gMeme.lines[gMeme.selectedLineIdx].txt
    elTxt.value = selectedBoxTxt
}

function setFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setFontSize(fontChangeSize) {
    //if increase
    if (fontChangeSize.dataset.fsize === '+') { gMeme.lines[gMeme.selectedLineIdx].size += 5 }
    else { gMeme.lines[gMeme.selectedLineIdx].size -= 5 }
}

function setUnderline(){
    gMeme.lines[gMeme.selectedLineIdx].isUnderline=1
}

function setAlignment(alignTxt){
    gMeme.lines[gMeme.selectedLineIdx].align=alignTxt
}

function drawText(text, x, y,color,size,fontFamily,isUnderline,align) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = `${color}`
    gCtx.font = `${size}px ${fontFamily}`;
    // gCtx.textAlign = `${align}`
    gCtx.textAlign = `center`
    gCtx.textBaseline = 'middle'

    if(align==='left') x= x-100
    else if(align==='right') x= x+100
    
    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
    
    
    if(isUnderline){
        let { width ,fontBoundingBoxDescent, fontBoundingBoxAscent} = gCtx.measureText(text);
        const height = fontBoundingBoxDescent+fontBoundingBoxAscent
        gCtx.fillRect( x - width / 2, y+height/2, width, 4);
        gCtx.stroke()   
    }
}

function switchFocusLine() {
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) gMeme.selectedLineIdx = 0
    else gMeme.selectedLineIdx++
    changePlaceHolderTxt()
}

function clearCanvasLines() {
    gMeme.lines = []
}

function drawFocusRect(x, y, textWidth, textHeight) {
        gCtx.strokeStyle = 'grey'
        gCtx.fillStyle = '#d6d1d168'
        gCtx.beginPath();
        gCtx.roundRect(x, y, textWidth, textHeight,[20])
        gCtx.stroke()
        // gCtx.strokeRect(x, y, textWidth, textHeight)
        gCtx.fill()
        // return gFocusRect
    }
    
    function moveUp() {
        const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
        selectedLine.y+=5       
    }
    
    function moveDown() {
        const selectedLine = gMeme.lines[gMeme.selectedLineIdx]
        selectedLine.y-=5   
    }
    
    
    
    function setFontFamily(fontFamily) {
        gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontFamily
    }
    
    
    function setSelectedLine() {
        gMeme.lines[gMeme.lines.length - 1].isSelected = true
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
    // function createImgs() {
    
    // }