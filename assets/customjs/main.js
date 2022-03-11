const navbarToggler = document.querySelector('.navbar-toggler')
const cartContainer = document.querySelector('.cart-container')
const productList = document.querySelector('.product-list')
const cartList = document.querySelector('.cart-list')
const cartTotal = document.getElementById('cart-total-value')
const cartCount = document.getElementById('cart-count-info')

let cartItemID = 1;

eventListeners()

// all event listeners
function eventListeners() {
    window.addEventListener('DOMContentLoaded', () => {
        loadJSON();
    })
    // navbar toggler
    navbarToggler.addEventListener('click', () => {
        document.querySelector('.navbar-collapse').classList.toggle('show-navbar')
    })

    //toggle cart container
    document.querySelector('#cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container')
    })

    document.querySelector('.cart-item-del-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container')
    }) 
}

function loadJSON() {
    fetch('assets/building.json')
        .then(res => res.json())
        .then(data => {
            let html = '';
            data.forEach(product => {
                html += `
                <div class="product-item">
                    <div class="product-img">
                        <img src="${product.imgSrc}" alt="product image">
                        <button type="button" class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"> </i>
                            Add To Cart
                        </button>
                    </div>

                    <div class="product-content">
                        <h3 class="product-name">${product.name}</h3>
                        <span class="product-category">
                        ${product.category}
                        </span>
                        <p class="product-price">$${product.price}</p>
                    </div>
                </div> `
            })
            productList.innerHTML = html;
        })
        .catch(err => {
            alert('Use live server or local server')
        })
}