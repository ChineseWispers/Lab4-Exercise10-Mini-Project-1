
fetch('https://fakestoreapi.com/products') // Fetch API Data
.then(res=>res.json())
.then(json=> {
  let objectOfCategories = {};
  json.forEach(product => { // create Bootstrap cards to display items
    const card_template = document.getElementById("card-template").content.cloneNode(true);

    card_template.querySelector('.card-title').innerText = product.title;
    card_template.querySelector('.card-text').innerText = product.description;
    card_template.querySelector('.list-group-item').innerText = `$${product.price.toFixed(2)}`;
    card_template.querySelector('.card-img-top').setAttribute('src', `/assets/${product.category}.jpeg`);
    card_template.querySelector('p').innerText = toTitleCase(product.category)

    document.querySelector('#responsive-container').appendChild(card_template);

    product.category in objectOfCategories ? objectOfCategories[product.category]++ : objectOfCategories[product.category] = 1});

  let listOfCategories = Object.keys(objectOfCategories); // create drop down selection for product categories
  const category_template = document.getElementById("category-template").content.cloneNode(true);
  category_template.querySelector('.dropdown-item').innerText = 'All Categories';
  const dropdown_menu = document.querySelector('.dropdown-menu');
  dropdown_menu.appendChild(category_template);

  listOfCategories.forEach(category => {
    const category_template = document.getElementById("category-template").content.cloneNode(true);

    category_template.querySelector('.dropdown-item').innerText = toTitleCase(category);
    
    dropdown_menu.insertBefore(category_template, dropdown_menu.firstChild);
  })
})

function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
};

function filterCategories(element) { // onclick function for dropdown selection
  
  let cards = Array.from(document.getElementsByClassName("col"));
  cards.forEach(card => card.style.display = "block");
  if (element.innerText != 'All Categories') {
    cards.forEach(card => {
      if (card.querySelector('p').innerText != element.innerText) {
        card.style.display = "none";
      }
    })
  };
};

let searchElement = document.querySelector('.d-flex'); // create a search for item features
searchElement.addEventListener("submit", (e) => {
  e.preventDefault();

  let cards = Array.from(document.getElementsByClassName("col"));
  cards.forEach(card => card.style.display = "block");

  let searchString = document.querySelector('.form-control').value;
  if (searchString.length != 0) {

    let searchWords = searchString.split(" ");
    searchWords.forEach(word => {
      cards.forEach(card => {
      cardTitle = card.querySelector('.card-title').innerText.toLowerCase();
      cardCategory = card.querySelector('p').innerText.toLowerCase();

      if (!cardTitle.includes(word) && !cardCategory.includes(word)) { // searches title and category string
        console.log(cardTitle)
        card.style.display = "none";
      };
    })
  })
  }
})
