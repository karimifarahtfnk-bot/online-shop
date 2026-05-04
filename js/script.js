let products = [
  { name: "Shoes", price: 20, category: "fashion", image: "images/shoes.jpg" },
  { name: "Bag", price: 15, category: "fashion", image: "images/bag.jpg" },
  { name: "Watch", price: 30, category: "accessory", image: "images/watch.jpg" }
];

let cart = [];


function displayProducts(list = products) {
  let container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  list.forEach(p => {
    let card = document.createElement("div");
    card.className = "col-md-4";

    card.innerHTML = `
      <div class="card p-2">
        <img src="${p.image}" alt="${p.name}" class="img-fluid">
        <h4>${p.name}</h4>
        <p>$${p.price}</p>
        <button class="btn btn-warning add-btn">Add</button>
        <button class="btn btn-info view-btn">View</button>
      </div>
    `;

    card.querySelector(".add-btn").addEventListener("click", () => addToCart(p));
    card.querySelector(".view-btn").addEventListener("click", () => showDetails(p));

    container.appendChild(card);
  });
}
displayProducts();


function addToCart(product) {
  let item = cart.find(p => p.name === product.name);
  if (item) item.quantity++;
  else cart.push({...product, quantity:1});

  updateCartCount();
  showToast();
}

function updateCartCount() {
  let count = cart.reduce((sum, i) => sum + i.quantity, 0);
  let el = document.getElementById("cart-count");
  if(el) el.innerText = count;
}


document.getElementById("search")?.addEventListener("keyup", e=>{
  let val = e.target.value.toLowerCase();
  displayProducts(products.filter(p=>p.name.toLowerCase().includes(val)));
});


document.querySelectorAll(".filter-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    let cat = btn.dataset.cat;
    if(cat==="all") displayProducts(products);
    else displayProducts(products.filter(p=>p.category===cat));
  });
});

document.getElementById("darkBtn")?.addEventListener("click", ()=>{
  document.body.classList.toggle("dark");
});


function showDetails(p){
  document.getElementById("modal-content").innerHTML = `
    <img src="${p.image}" class="img-fluid">
    <h3>${p.name}</h3>
    <p>$${p.price}</p>`;
  new bootstrap.Modal(document.getElementById("productModal")).show();
}

function showToast(){
  new bootstrap.Toast(document.getElementById("toast")).show();
}


document.getElementById("form")?.addEventListener("submit", e=>{
  let name = document.getElementById("name");
  let email = document.getElementById("email");
  let address = document.getElementById("address");

  let valid = true;

  if(name.value===""){
    document.getElementById("nameError").innerText="Required";
    valid=false;
  }

  if(!email.value.includes("@")){
    document.getElementById("emailError").innerText="Invalid email";
    valid=false;
  }

  if(address.value===""){
    document.getElementById("addressError").innerText="Required";
    valid=false;
  }

  if(!valid) e.preventDefault();
});