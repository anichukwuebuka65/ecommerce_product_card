import { Cart, Item } from "./classes";

const closeBtn = document.querySelector(".close-btn");
const sidebarCloseBtn = document.querySelector(".sidebar svg");
const sidebarContainer = document.querySelector(".sidebar");
const modal = document.querySelector("#modal");
const cartBtnIcon = document.querySelector(".items-count");
const cartWrapper = document.querySelector(".cart");
const ctaBtn = document.querySelector(".btn__cta");
const modalThumbnail = document.querySelectorAll(".thumbnail__container div");
const modalLargeImg = document.querySelector(".modal__image-big");
const largeImg = document.querySelector(".product__image-big");
const prevNxtBtns = document.querySelectorAll(".modal__image-wrapper div, .product__image div");
const menuBtn = document.querySelector(".menu__btn");

const images = ["image-product-1.jpg", 
"image-product-2.jpg", 
"image-product-3.jpg",
"image-product-4.jpg"]

const cartVisibility = {
    isCartVisible : false,
    changeVisibility() {
        if ( this.isCartVisible){
         cartWrapper.style.display = "none" ;
        this.isCartVisible = false;
    }   
    else {
        cartWrapper.style.display = "block";
        this.isCartVisible = true;
        }
    }
}

prevNxtBtns.forEach(btn => btn.addEventListener("click",(e) => {
    let id =  document.querySelector(".modal__image-big").src.slice(-5,-4);
       
    if(e.currentTarget.classList.contains("next")) {
        if(id > 3) id = 0;
        id++;
        modalLargeImg.src = `images/${images[id - 1]}`; 
        largeImg.src = `images/${images[id - 1]}`; 
    }
    if(e.currentTarget.classList.contains("previous")) {
        if(id < 2) id = 5;
        id--;
         modalLargeImg.src = `images/${images[id - 1]}`; 
        largeImg.src =`images/${images[id - 1]}`; 
    }
        console.log(large);

}))

modalThumbnail.forEach(thumbnail => thumbnail.addEventListener("click",(e) => {
    modal.style.display = "flex";
    modalLargeImg.src = `images/${images[e.target.id - 1]}`;
  
}))

sidebarCloseBtn.addEventListener("click",(e) => {
     sidebarContainer.style.display = "none";
})
menuBtn.addEventListener("click",(e) => {
     sidebarContainer.style.display = "block";
})
cartBtnIcon.addEventListener("click", cartVisibility.changeVisibility.bind(cartVisibility));

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
})

const cart = new Cart();
const updateCartUI = cart.updateCartUI.bind(cart);
const removeFromCart = cart.removeFromCart.bind(cart);

ctaBtn.addEventListener("click", (e) => {
    if(cart.cartItems[0]?.id === e.target.id) return
    const item = new Item(e.target.id, 125, updateCartUI, removeFromCart);
    cart.addToCart(item);
    item.attachListener();
})



