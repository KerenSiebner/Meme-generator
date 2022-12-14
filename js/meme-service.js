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
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            align: 'left',
            color: 'red'
        }
    ]
}

// TODO-2 
function getMeme() {
    return gMeme
}

function getImg(){
    const imgIdx = gMeme.selectedImgId
    const imgSelected = gImgs.find(({id})=>id === imgIdx)
    const imgUrl = imgSelected.url
    return imgUrl
}

function getImgs(){
    return gImgs
}

function getTxt(){
    const txtLine = gMeme.lines[0].txt
    return txtLine
}

//TODO-3 update gMeme from user input
function setLineTxt(inputTxt) {
    gMeme.lines[0].txt = inputTxt
    //TODO-4 render the Meme according to the input text
    renderMeme()
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = "40px impact";
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'

    gCtx.fillText(text, x, y) // Draws (fills) a given text at the given (x, y) position.
    gCtx.strokeText(text, x, y) // Draws (strokes) a given text at the given (x, y) position.
}

//TO-DO-6 when selecting img from gallary using funciton bellow

function onImgSelect(img) {
    const imgId = +img.dataset.id
    console.log('imgId', imgId)
    const selectedImg = gImgs.find(img => img.id===imgId)
    gMeme.selectedImgId=selectedImg.id
    renderMeme()
}