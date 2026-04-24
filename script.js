const products = [
 {id:1,name:"Чайник",price:500,rating:4,img:"img/kettle.jpg"},
 {id:2,name:"Праска",price:800,rating:5,img:"img/iron.jpg"},
 {id:3,name:"Міксер",price:1200,rating:3,img:"img/mixer.jpg"},
 {id:4,name:"Пилосос",price:3000,rating:5,img:"img/vacuum.jpg"},
 {id:5,name:"Блендер",price:900,rating:4,img:"img/blender.jpg"},
 {id:6,name:"Тостер",price:700,rating:4,img:"img/toaster.jpg"},
 {id:7,name:"Кавоварка",price:2500,rating:5,img:"img/coffee.jpg"},
 {id:8,name:"Фен",price:600,rating:4,img:"img/dryer.jpg"},
 {id:9,name:"Мультиварка",price:2200,rating:5,img:"img/multicooker.jpg"},
 {id:10,name:"Гриль",price:1800,rating:4,img:"img/grill.jpg"},
 {id:11,name:"Ваги",price:400,rating:3,img:"img/scale.jpg"},
 {id:12,name:"Соковижималка",price:1500,rating:4,img:"img/juicer.jpg"}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/* SKELETON */
function showSkeleton(){
 let s=document.getElementById("skeleton");
 for(let i=0;i<8;i++){
  s.innerHTML+=`<div class="skeleton-card"></div>`;
 }
}
function hideSkeleton(){
 document.getElementById("skeleton").style.display="none";
}

/* RENDER */
function renderProducts(list){
 const catalog=document.getElementById("catalog");
 catalog.innerHTML="";

 list.forEach(p=>{
  let el=document.createElement("div");

  el.innerHTML=`
   <div class="product-card">
    ${p.price<800?'<div class="badge">SALE</div>':''}

    <div class="product-image">
     <img src="${p.img}" onclick="openModal(${p.id})">
    </div>

    <div class="product-body">
     <h4>${p.name}</h4>
     <div>${"★".repeat(p.rating)}</div>
     <div class="price">${p.price} грн</div>

     <div class="actions">
      <button class="buy" onclick="addToCart(${p.id})">Купити</button>
      <button class="wish" onclick="addToWishlist(${p.id})">❤</button>
     </div>
    </div>
   </div>
  `;

  catalog.appendChild(el);
 });

 gsap.from(".product-card",{opacity:0,y:30,stagger:0.05});
}

/* CART */
function addToCart(id){
 let p=products.find(x=>x.id===id);
 cart.push(p);
 save();
 renderCart();
}

function removeFromCart(i){
 cart.splice(i,1);
 save();
 renderCart();
}

function renderCart(){
 let el=document.getElementById("cartItems");
 el.innerHTML="";
 let total=0;

 cart.forEach((item,i)=>{
  total+=item.price;

  el.innerHTML+=`
   <div class="cart-item">
    ${item.name}
    <button onclick="removeFromCart(${i})">❌</button>
   </div>
  `;
 });

 document.getElementById("count").textContent=cart.length;
 document.getElementById("total").textContent=total;
 document.getElementById("total2").textContent=total;
}

/* WISHLIST */
function addToWishlist(id){
 let p=products.find(x=>x.id===id);
 wishlist.push(p);
 save();
 renderWishlist();
}

function renderWishlist(){
 let el=document.getElementById("wishlist");
 el.innerHTML="";
 wishlist.forEach(i=>{
  el.innerHTML+=`<div>${i.name}</div>`;
 });
}

/* SEARCH */
searchInput.oninput=e=>{
 let val=e.target.value.toLowerCase();
 renderProducts(products.filter(p=>p.name.toLowerCase().includes(val)));
};

/* FILTER */
function applyFilters(){
 let filtered=[...products];

 if(minPrice.value) filtered=filtered.filter(p=>p.price>=minPrice.value);
 if(maxPrice.value) filtered=filtered.filter(p=>p.price<=maxPrice.value);
 if(ratingFilter.value) filtered=filtered.filter(p=>p.rating>=ratingFilter.value);

 renderProducts(filtered);
}

[minPrice,maxPrice,ratingFilter].forEach(el=>el.oninput=applyFilters);

/* SORT */
sort.onchange=e=>{
 let sorted=[...products];

 if(e.target.value==="cheap") sorted.sort((a,b)=>a.price-b.price);
 if(e.target.value==="expensive") sorted.sort((a,b)=>b.price-a.price);

 renderProducts(sorted);
};

/* MODAL */
function openModal(id){
 let p=products.find(x=>x.id===id);

 modalContent.innerHTML=`
  <h2>${p.name}</h2>
  <img src="${p.img}" style="width:100%">
  <p>${p.price} грн</p>
  <button onclick="addToCart(${p.id})">Купити</button>
 `;

 modal.style.display="flex";
}

modal.onclick=()=>modal.style.display="none";

/* CHECKOUT */
function checkout(){
 if(cart.length===0) return alert("Кошик пустий");

 let total=cart.reduce((s,i)=>s+i.price,0);

 alert("Замовлення оформлено! Сума: "+total);

 cart=[];
 save();
 renderCart();
}

/* STORAGE */
function save(){
 localStorage.setItem("cart",JSON.stringify(cart));
 localStorage.setItem("wishlist",JSON.stringify(wishlist));
}

/* INIT */
showSkeleton();

setTimeout(()=>{
 hideSkeleton();
 renderProducts(products);
 renderCart();
 renderWishlist();
},800);