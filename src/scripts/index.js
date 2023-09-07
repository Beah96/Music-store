import { products, categories } from "./productsData.js";
const albumDiv = document.querySelector(".albums__div")
const noAlbumMessage = document.querySelector(".albums__div > p")
const filterSpecificButton = document.querySelectorAll(".specific__button")
const allButton = document.querySelector(".all__button")
const priceRange = document.querySelector('#priceRange')
const infoPriceRange = document.querySelector('.priceRange__p')


function renderAlbumCard(array){
    let albumList = document.createElement("ul")
    albumList.classList.add("albums__ul")
    array.forEach((element) => {
        let albumCard = document.createElement("li")
        albumCard.classList.add("album__li")

        let albumImage = document.createElement("img")
        albumImage.classList.add("album__img")
        albumImage.src = element.img

        let infoSpan = document.createElement("span")
        infoSpan.classList.add("info__span")

        let bandName = document.createElement("p")
        bandName.classList.add("albumInfo__p")
        bandName.innerText = element.band

        let albumYear = document.createElement("p")
        albumYear.classList.add("albumInfo__p")
        albumYear.innerText = element.year

        infoSpan.append(bandName, albumYear)

        let albumName = document.createElement("p")
        albumName.classList.add("albumName__title")
        albumName.innerHTML =`<strong>${element.title}</strong>` 

        let priceSpan = document.createElement("span")
        priceSpan.classList.add("price__span")

        let albumPrice = document.createElement("p")
        albumPrice.classList.add("albumPrice__p")
        albumPrice.innerText = `R$${element.price.toFixed(2)}`

        let albumButton = document.createElement("button")
        albumButton.classList.add("album__button")
        albumButton.innerText = "Comprar"

        priceSpan.append(albumPrice, albumButton)
        let infoDiv = document.createElement("div")
        infoDiv.classList.add("info__div")

        infoDiv.append(infoSpan,albumName,priceSpan)
        albumCard.append(albumImage, infoDiv)
        albumList.appendChild(albumCard)
    });

    albumDiv.appendChild(albumList)
}

function filterByCategory(arrayElements, arrayCategory, string){
    let newList = []
    arrayElements.forEach((element)=>{
        let i = element.category 
        if(arrayCategory[i] === string){
            newList.push(element)
        }
    })
        
    return newList
}   

function filterByRange(array){
    const filteredAlbums = array.filter((element)=>{
        return element.price <= priceRange.value
    })
    return filteredAlbums
}

function checkAlbums(){
    let list = document.querySelector(".albums__ul")
    if(list.children.length === 0){
        noAlbumMessage.classList.remove("none")
    }else{
        noAlbumMessage.classList.add("none")
    }
}

function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('priceRange')
  } 
  const min = target.min
  const max = target.max
  const val = target.value
  
  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}


allButton.addEventListener("click",()=>{
    infoPriceRange.innerHTML = `<strong>Até R$${priceRange.value}.00</strong>`
    const oldList = document.querySelector(".albums__ul")
    oldList.remove()
    localStorage.removeItem("category")
    let filteredAlbums = filterByRange(products)
    renderAlbumCard(filteredAlbums)
    checkAlbums()
})

filterSpecificButton.forEach((button)=>{
        button.addEventListener("click", ()=>{
            const oldList = document.querySelector(".albums__ul")
            oldList.remove() 
            let filteredAlbums = filterByRange(products)
            let albumsByCategory =  filterByCategory(filteredAlbums, categories, button.innerText)
            localStorage.setItem("category", button.innerText)
            renderAlbumCard(albumsByCategory)
            checkAlbums()
        })
})   
    
priceRange.addEventListener("input", (e)=>{
    handleInputChange(e)
    infoPriceRange.innerHTML = `<strong>Até R$${priceRange.value}.00</strong>`
    const oldList = document.querySelector(".albums__ul")
    oldList.remove()
    let categoryDefined = localStorage.getItem("category")
    let filteredAlbums = filterByRange(products)
    let albumsByCategory =  filterByCategory(filteredAlbums, categories, categoryDefined)
    renderAlbumCard(albumsByCategory)
    checkAlbums()

    if(!categoryDefined){
        const oldList = document.querySelector(".albums__ul")
        oldList.remove()
        renderAlbumCard(filteredAlbums)
        checkAlbums()
    }
})

renderAlbumCard(products)
