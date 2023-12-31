const galleryItemTemplate = 
document.querySelector("[data-gallery-item-template]")
const galleryItems = document.querySelector("[data-gallery-items]")
const searchInput = document.getElementById("search-input")
const mainHeader = document.getElementById("main-header")
const searchForm = document.querySelector("form[role='search']")

let surfboards = []

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase()
    surfboards.forEach(surfboard => {
        const isVisible = 
        surfboard.surfboard.toLowerCase().includes(value) || 
        surfboard.brand.toLowerCase().includes(value)
        surfboard.element.classList.toggle("u-hidden", !isVisible)
    })
})

function resultsArray(input) {
    const value = input.toLowerCase()
    surfboards.forEach(surfboard => {
        const isVisible = 
        surfboard.surfboard.toLowerCase().includes(value) || 
        surfboard.brand.toLowerCase().includes(value)
        surfboard.element.classList.toggle("u-hidden", !isVisible)
    })
}

fetch("/data/surfboards.json")
.then(response => response.json())
.then(data => {
    surfboards = data.map(item => {     
        const galleryItem =  galleryItemTemplate.content
        .cloneNode(true).children[0]
        const img = galleryItem.querySelector("[data-gallery-item-img]")
        const title = galleryItem.querySelector("[data-gallery-item-title]")
        const meta = galleryItem.querySelector("[data-gallery-item-meta]")
        const reviews = galleryItem.querySelector("[data-reviews]")
        img.setAttribute("src", item.imgPath)
        title.innerText = item.surfboard
        meta.innerText = item.brand
        reviews.innerText = item.rating
        galleryItems.append(galleryItem)
        return { surfboard: item.surfboard, brand: item.brand, element: galleryItem }
    });
})

window.addEventListener('scroll', () => {
    if(window.scrollY > 0) {
        mainHeader.setAttribute("data-scroll", true)
    } else {
        mainHeader.setAttribute("data-scroll", false)
    }
})

// PROBLEM
// The current app doesn't direct us to a new page.
// Instead it manipulates the data on the page.
//
// PLAN
// Steps:
// [1] For each surfboard object see if the search input "includes" 
//     it's values
// [2] if true, add class "u-hidden" to the surfboard element and
//     push the surfboard object into an a "results" array
// [3] redirect to a results page containing the results array data



searchForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let searchFormData = new FormData(searchForm)
    let searchInputValue = searchFormData.get("searchInput")
    window.localStorage.setItem("searchInput", searchInputValue)
    window.location.href = "/pages/results.html"
})

window.addEventListener("load", function() {
    if (window.location.href.includes('/index.html')) {
        window.localStorage.setItem("searchInput", '')
    }
    searchInput.value = window.localStorage.getItem("searchInput")
    
    this.setTimeout(function(){
        resultsArray(searchInput.value)
    }, 100)
})





let x = 2

let myPromise = new Promise( function (resolve, reject) {
    if (x == 2) {
        resolve('Fulfilled') 
    } else {
        reject('Reject')
    }
})

myPromise.
then((fullfilled) => console.log(fullfilled), 
    (reject) => console.log(reject))


console.log(fetch('/data/surfboards.json'))
    



