'use-strict'

var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['trump', 'politics'] },
    { id: 2, url: 'img/2.jpg', keywords: ['puppy', 'pets'] },
    { id: 3, url: 'img/3.jpg', keywords: ['puppy', 'pets'] },
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
    if(gMeme.lines===[]) return null
    const txtLines = gMeme.lines.map(line => line.txt)
    console.log('txtLines', txtLines)
    return txtLines
}

//TODO-3 update gMeme from user input
function setLineTxt(inputTxt) {
    gMeme.lines.push(_createLine(inputTxt))
}

function _createLine(txt){
    return  line=
        {
            txt,
            size: 30,
            align: 'center',
            color: 'white'
        }
}

function addLine(){
    clearInputTxt()   
}

function switchLine(){
    const numberOfLines = gMeme.lines.length
    if (numberOfLines<1) return
    else {
        //switch between first and last line
        const firstLine = gMeme.lines[0]
        const lastLine = gMeme.lines[numberOfLines-1]
        gMeme.lines[0] = lastLine
        gMeme.lines[numberOfLines-1] = firstLine
    }
}

function clearInputTxt(){
    var elTxt = document.querySelector('.txt-input')
    console.log('elTxt.value', elTxt.value)
    if (elTxt.value!="") elTxt.value=""
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
}

function clearCanvasLines(){
    gMeme.lines= []
}