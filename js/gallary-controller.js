'use-strict'

//TODO-5 presenting 2 images

function renderGallary() {
    const elGallary = document.querySelector('.gallary')
    const imgs = getImgs()
    let strHTMLs=[]
    imgs.forEach(img => {
        strHTMLs.push(`<img src="${img.url}" data-id="${img.id}" class="img img${img.id}" onclick="onImgSelect(this)">`)
    })
    elGallary.innerHTML = strHTMLs.join()
}

