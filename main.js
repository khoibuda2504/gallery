const container = document.getElementById('container')
const sizeArr = ['small', 'medium', 'large']
let galleryImage = ''
for (i = 1; i <= 14; i++) {
  const div = document.createElement('div')
  div.classList.add("card", `card-${sizeArr[Math.floor(Math.random() * 3)]}`)
  div.innerHTML = `<img src="./src/${i}.jpg" />`
  container.append(div)
}

for (i = 1; i <= 14; i++) {
  const div = document.createElement('div')
  div.classList.add("card", `card-${sizeArr[Math.floor(Math.random() * 3)]}`)
  div.innerHTML = `<img data-src="./src/${i}.jpg" />`
  container.append(div)
}

const images = document.querySelectorAll('[data-src]')

function preloadImage(img) {
  const src = img.getAttribute('data-src')
  if (!src) return
  img.src = src
}

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    preloadImage(entry.target)
    imgObserver.unobserve(entry.target)
  })
}, {
  threshold: 0,
  rootMargin: "0px 0px -300px 0px"
})

images.forEach(image => {
  imgObserver.observe(image)
})
document.querySelectorAll('img').forEach(image => {
  image.addEventListener('click', () => {
    document.getElementById('popup-image').style.display = 'block'
    document.querySelector('.popup-image img').src = image.getAttribute('src')
  })
})
document.querySelector('.popup-image span').addEventListener('click', () => {
  document.getElementById('popup-image').style.display = 'none'
})
window.addEventListener('keydown', (e) => {
  if (e.keyCode !== 27) return
  document.getElementById('popup-image').style.display = 'none'
})