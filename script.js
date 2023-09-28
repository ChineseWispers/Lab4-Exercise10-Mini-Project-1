
fetch('https://fakestoreapi.com/products')
.then(res=>res.json())
.then(json=> {
  console.log(json)
  json.forEach(product => {
    const template = document.getElementById("card-template").content.cloneNode(true);

    template.querySelector('.card-title').innerText = product.title;
    template.querySelector('.card-text').innerText = product.description;
    template.querySelector('.card-img-top').setAttribute('src', `/assets/${product.category}.jpeg`)

    document.querySelector('#responsive-container').appendChild(template);
  })
})
