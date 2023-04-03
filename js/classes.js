import { getCartContent } from "./constants";

export class Item {
    count = 0;
    itemCount = document.querySelector("#items__count");
    changeCountbtns = document.querySelectorAll(".btn__controls button");
    
    constructor(id, price, updateCartUI, removeFromCart){
        this.id = id;
        this.price = price;
        this.updateCartUI = updateCartUI;
        this.removeFromCart = removeFromCart;
        this.changeCountbtns.forEach(btn => btn.addEventListener("click", e => {
            if(e.target.id === "increase") {
                this.increaseCount();
            } else {
                this.decreaseCount();
            }
        }))
    }

    attachListener(){
        const deleteBtn = document.querySelector(`#delete${this.id}`);
        deleteBtn.addEventListener("click", () => {
            this.removeFromCart(this.id);
        })
    }

    increaseCount(){
        this.count++;
        this.updateCountUI();
        this.updateCartUI();
    };
    decreaseCount(){
        if (this.count == 0) return
        this.count--;
        this.updateCountUI()
        this.updateCartUI();
    }
    updateCountUI(){
        this.itemCount.innerText = this.count;
    }
     
}

export class Cart {
    cartItems = []
    cartContainer =  document.querySelector(".cart-container");
    cartCountContainer = document.querySelector("#cart__items__count");
    cartBtnIcon = document.querySelector(".items-count"); 
    
    addToCart(item) {
        item.increaseCount();
        this.cartItems.push(item);
        this.updateCartUI();
    }

    removeFromCart(id){
        this.id--;
        this.cartItems = this.cartItems.filter(item => item.id !== id)
        this.updateCartUI();
    }

    updateCartUI(){
        this.cartCountContainer.innerText = this.cartItems.reduce((sum, item) => sum + item.count ,0);
        this.cartContainer.innerHTML = "";
        this.cartItems = this.cartItems.filter(item => item.count > 0)

        if(this.cartItems.length > 0 ) {
            this.cartItems.forEach((item) => {
                const html = getCartContent(item);
                const div = document.createElement("div");
                div.classList.add("cart-details")
                div.innerHTML = html;
                this.cartContainer.appendChild(div);
            });

            const button = document.createElement("button")
            button.classList.add("checkout");
            button.innerText = "checkout";
            this.cartContainer.appendChild(button);
        } else {
                this.cartContainer.innerHTML = "<p class='empty'>Your cart is empty</p>";
        }
       
    }
}