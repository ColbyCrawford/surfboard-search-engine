const galleryItemTemplate = 
document.querySelector("[data-gallery-item-template]")
const galleryItems = document.querySelector("[data-gallery-items]")
const searchInput = document.getElementById("search-input")
const mainHeader = document.getElementById("main-header")

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