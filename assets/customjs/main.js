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
        loadCart();
    })
    // navbar toggler
    navbarToggler.addEventListener('click', () => {
        document.querySelector('.navbar-collapse').classList.toggle('show-navbar')
    })

    //toggle cart container
    document.querySelector('#cart-btn').addEventListener('click', () => {
        cartContainer.classList.toggle('show-cart-container')
    })

    // document.querySelector('.cart-item-del-btn').addEventListener('click', () => {
    //     cartContainer.classList.toggle('show-cart-container')
    // })

    productList.addEventListener('click', purchaseProduct)
}

// update cart info
function updateCartInfo() {
    let cartInfo = findCartInfo();
    cartCount.textContent = cartInfo.productCount
    cartTotal.textContent = cartInfo.total
}

updateCartInfo()

function loadJSON() {
    fetch('assets/building.json')
        .then(res => res.json())
        .then(data => {
            let html = '';
            data.forEach(product => {
                html += `
                <div class="product-item">
                    <div class="product-img">
                        <img class='img' src="${product.imgSrc}" alt="product image">
                        <button type="button" class="add-to-cart-btn">
                            <i class="fas fa-shopping-cart"> </i>
                            Add To Cart
                        </button>
                    </div>

                    <div class="product-content">
                        <h3 class="product-name">${product.name}</h3>
                        <span class="product-category">${product.category}</span>           
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

// purchase product
function purchaseProduct(e) {
    if (e.target.classList.contains('add-to-cart-btn')) {
        let product = e.target.parentElement.parentElement
        getProductInfo(product);
    }
}

// get product info
function getProductInfo(product) {
    let productInfo = {
        id: cartItemID,
        name: product.querySelector('.product-name').textContent,
        category: product.querySelector('.product-category').textContent,
        price: product.querySelector('.product-price').textContent,
        imgSrc: product.querySelector('.product-img img').src
    }
    cartItemID++
    addToCartList(productInfo);
    saveProductInStorage(productInfo)
}

//add selected product to cart list
function addToCartList(product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute(`data-id`, `${product.id}`);
    cartItem.innerHTML = `
            <img src="${product.imgSrc}" alt="product image">
            <div class="cart-item-info">
                <h3 class="cart-item-name">${product.name}</h3>
                <span class="cart-item-category">${product.category}</span>
                <span class="cart-item-price">${product.price}</span>
            </div>
            <button type="button" class="cart-item-del-btn">
                <i class="fas fa-times"></i>
            </button>
        `
    cartList.appendChild(cartItem)
}

// save the cart item to localstorage
function saveProductInStorage(item) {
    let products = getProductFromStorage();
    products.push(item);
    localStorage.setItem('products', JSON.stringify(products)
    );
}

// get all the products if any form localstorage
function getProductFromStorage() {
    return localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : []
    // returns empty array if nothing in localStorage
}

// load carts product
function loadCart() {
    let products = getProductFromStorage();
    // update beginning cartID on refresh
    if (products.length < 1) {
        cartItemID = 1;
    }
    else {
        cartItemID = products[products.length - 1].id;
        cartItemID++;
    }
    products.forEach(product => addToCartList(product))
}

// calculate cart info
function findCartInfo() {
    let products = getProductFromStorage();
    let total = products.reduce((acc, product) => {
        let price = parseFloat(product.price.substr(1));
        // remove the dollar sign
        return acc += price
    }, 0) //adding all the prices

    return {
        total: total.toFixed(2),
        productCount: products.length
    }
}