const products = [
{
name:"Fried Chicken",
price:120,
img:"https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=500"
},
{
name:"Chicken Burger",
price:150,
img:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
},
{
name:"Chicken Pizza",
price:250,
img:"https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500"
},
{
name:"Chicken Wings",
price:180,
img:"https://images.unsplash.com/photo-1608039755401-742074f0548d?w=500"
},
{
name:"Chicken Nuggets",
price:140,
img:"https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=500"
},
{
name:"French Fries",
price:90,
img:"https://images.unsplash.com/photo-1576107232684-1279f390859f?w=500"
},
{
name:"Chicken Roll",
price:130,
img:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500"
},
{
name:"Chicken Shawarma",
price:170,
img:"https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500"
},
{
name:"Chicken Sandwich",
price:110,
img:"https://images.unsplash.com/photo-1550547660-d9450f859349?w=500"
},
{
name:"Chicken Popcorn",
price:160,
img:"https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?w=500"
}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const productContainer = document.getElementById("products");
const count = document.getElementById("count");

function displayProducts(){
let html = "";

products.forEach((p,i)=>{
html += `

<div class="card">
<img src="${p.img}" alt="${p.name}">
<h3>${p.name}</h3>
<p>₹${p.price}</p>
<button class="add-btn" onclick="addToCart(${i})">
Add To Cart
</button>
</div>
`;
});productContainer.innerHTML = html;
}

function addToCart(i){

let item = products[i];

let exist = cart.find(x => x.name === item.name);

if(exist){
exist.qty++;
}else{
cart.push({...item,qty:1});
}

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();
renderCart();
}

function updateCart(){

let totalQty = cart.reduce((sum,item)=>sum+item.qty,0);

count.innerText = totalQty;

localStorage.setItem("cart",JSON.stringify(cart));
}

const cartItems = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

function renderCart(){

cartItems.innerHTML = "";

let total = 0;

cart.forEach((item,i)=>{

total += item.price * item.qty;

cartItems.innerHTML += `

<div class="cart-item"><img src="${item.img}"><div>
<h4>${item.name}</h4>
<p>₹${item.price}</p>
<p>Qty: ${item.qty}</p><button onclick="changeQty(${i},1)">+</button>
<button onclick="changeQty(${i},-1)">-</button>
<button onclick="removeItem(${i})">❌</button>

</div></div>
`;
});totalEl.innerText = total;
}

function changeQty(i,val){

cart[i].qty += val;

if(cart[i].qty <= 0){
cart.splice(i,1);
}

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();
renderCart();
}

function removeItem(i){

cart.splice(i,1);

localStorage.setItem("cart",JSON.stringify(cart));

updateCart();
renderCart();
}

document.getElementById("cart-btn")
.addEventListener("click",()=>{

document.getElementById("cart")
.classList.add("active");

renderCart();

});

function closeCart(){

document.getElementById("cart")
.classList.remove("active");

}

function goCheckout(){

localStorage.setItem("cart",
JSON.stringify(cart));

window.location.href =
"checkout.html";

}

const themeBtn =
document.getElementById("theme-btn");

if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark");
themeBtn.innerHTML="☀️";
}

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
themeBtn.innerHTML="☀️";
}else{
localStorage.setItem("theme","light");
themeBtn.innerHTML="🌙";
}

});

displayProducts();
updateCart();
renderCart();