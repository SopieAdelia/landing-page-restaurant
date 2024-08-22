let search = document.querySelector('.search-box');

document.querySelector('#search').onclick = () => {
search.classList.toggle('active');
}


let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});


let cart = [];
let cartQuantity = 0;

const products = [
    { id: 1, name: "Produk 1", price: 50000, img: "aset/p1.png" },
    { id: 2, name: "Produk 2", price: 60000, img: "aset/p2.png" },
    { id: 3, name: "Produk 3", price: 70000, img: "aset/p3.png" },
    { id: 4, name: "Produk 4", price: 75000, img: "aset/p4.png" },
    { id: 5, name: "Produk 5", price: 80000, img: "aset/p5.png" },
    { id: 6, name: "Produk 6", price: 88000, img: "aset/p6.png" },
];

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        let productId = this.closest('.box').getAttribute('data-id');
        addToCart(productId);
    });
});

function addToCart(productId) {
    let product = products.find(p => p.id == productId);
    let cartItem = cart.find(item => item.id == productId);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.quantity').innerText = cartQuantity;
    
    let listCard = document.querySelector('.listCard');
    listCard.innerHTML = '';
    cart.forEach(item => {
        let li = document.createElement('li');
        li.innerHTML = `
            <div> <img src="${item.img}" alt="${item.name}"></div>
                <div>${item.name}</div>
                <div>${item.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <div class="count">${item.quantity}</div>
                    <button onclick="changeQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>`;
        listCard.appendChild(li);
    });

    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.querySelector('.total').innerText = totalPrice;
}

function changeQuantity(productId, newQuantity) {
    let cartItem = cart.find(item => item.id == productId);
    if (cartItem) {
        if (newQuantity <= 0) {
            cart = cart.filter(item => item.id != productId);
        } else {
            cartItem.quantity = newQuantity;
        }
        updateCart();
    }
}

document.querySelector('.bx-cart-alt').addEventListener('click', () => {
    document.querySelector('.card').classList.toggle('active');
});

document.querySelector('.closeShopping').addEventListener('click', () => {
    document.querySelector('.card').classList.remove('active');
});



