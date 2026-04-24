/* Сайт розроблено студентом Гриценко Ілля Юрійович, ДТЕУ, ФЕМП, 4-11, 2026 */
const products = [
    {
        id: 1, name: "Чайник", price: 500, rating: 4.8, img: "img/kettle.jpg",
        desc: "Електричний чайник з функцією швидкого нагрівання.",
        specs: ["Об'єм: 1.7 л", "Потужність: 2000 Вт", "Матеріал: Нержавіюча сталь"],
        reviews: [
            { user: "Максим Р.", stars: 5, text: "Гріє воду дуже швидко, не смердить пластиком." },
            { user: "Анна К.", stars: 4, text: "Гарний дизайн, але трохи шумний." }
        ]
    },
    {
        id: 2, name: "Праска", price: 800, rating: 4.9, img: "img/iron.jpg",
        desc: "Потужна праска з керамічною підошвою та паровим ударом.",
        specs: ["Потужність: 2400 Вт", "Підошва: Кераміка", "Паровий удар: 150 г/хв"],
        reviews: [
            { user: "Ірина В.", stars: 5, text: "Прасує ідеально, пара подається рівномірно." }
        ]
    },
    {
        id: 3, name: "Міксер", price: 1200, rating: 4.5, img: "img/mixer.jpg",
        desc: "Ручний міксер з 5 швидкостями та турборежимом.",
        specs: ["Потужність: 450 Вт", "Насадки: Вінчики, гаки для тіста", "Кількість швидкостей: 5"],
        reviews: [
            { user: "Олег С.", stars: 5, text: "Дружина задоволена, тісто замішує на ура." }
        ]
    },
    {
        id: 4, name: "Пилосос", price: 3000, rating: 4.7, img: "img/vacuum.jpg",
        desc: "Компактний пилосос без мішка з контейнером для пилу.",
        specs: ["Тип: Контейнерний", "Потужність всмоктування: 350 Вт", "Об'єм пилозбірника: 2 л"],
        reviews: [
            { user: "Дмитро П.", stars: 4, text: "Тягне добре, але шнур міг би бути довшим." }
        ]
    },
    {
        id: 5, name: "Блендер", price: 900, rating: 4.6, img: "img/blender.jpg",
        desc: "Занурювальний блендер для приготування смузі та пюре.",
        specs: ["Потужність: 600 Вт", "Ніж: Нержавіюча сталь", "Комплектація: Мірний стакан"],
        reviews: [
            { user: "Вікторія Л.", stars: 5, text: "Зручний у використанні, легко миється." }
        ]
    },
    {
        id: 6, name: "Тостер", price: 700, rating: 4.8, img: "img/toaster.jpg",
        desc: "Тостер на 2 скибочки з функцією розморожування.",
        specs: ["Кількість відділень: 2", "Ступенів обсмажування: 6", "Матеріал корпусу: Пластик"],
        reviews: [
            { user: "Андрій Т.", stars: 5, text: "Ранкові тости тепер ідеальні." }
        ]
    },
    {
        id: 7, name: "Кавоварка", price: 2500, rating: 4.9, img: "img/coffee.jpg",
        desc: "Крапельна кавоварка для справжніх цінителів кави.",
        specs: ["Тип: Крапельна", "Об'єм кавника: 1.2 л", "Кава: Мелена"],
        reviews: [
            { user: "Євгенія М.", stars: 5, text: "Кава виходить смачна і гаряча. Рекомендую!" }
        ]
    },
    {
        id: 8, name: "Фен", price: 600, rating: 4.7, img: "img/dryer.jpg",
        desc: "Фен з іонізацією та подачею холодного повітря.",
        specs: ["Потужність: 2000 Вт", "Іонізація: Є", "Режими: 3 температурні"],
        reviews: [
            { user: "Олена П.", stars: 4, text: "Сушить швидко, волосся не перепалює." }
        ]
    }
];

let cart = [];

// --- 1. ВІДМАЛЬОВКА КАТАЛОГУ ---
function renderCatalog() {
    const catalog = document.getElementById("catalog");
    catalog.innerHTML = products.map(p => `
        <div class="product-card" onclick="openModal(${p.id})">
            <div class="img-container">
                <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/150?text=Фото'">
            </div>
            <h3>${p.name}</h3>
            <p>⭐ ${p.rating}</p>
            <p class="price">${p.price} грн</p>
        </div>
    `).join('');
}

// --- 2. ЛОГІКА КОШИКА ---
function addToCart(id) {
    const product = products.find(x => x.id === id);
    const existingItem = cart.find(x => x.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    closeModal();
}

function quickBuy(id) {
    addToCart(id);
    openCheckout();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById("cart-count").textContent = totalItems;
    document.getElementById("total-price").textContent = total;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    renderCheckoutCart();
}

function submitOrder() {
    if (cart.length === 0) return alert("Додайте товари в кошик для замовлення!");
    
    const name = document.getElementById("order-name").value;
    const phone = document.getElementById("order-phone").value;
    
    if(!name || !phone) return alert("Будь ласка, введіть ваше ім'я та телефон.");

    alert(`Дякуємо, ${name}! Ваша заявка успішно відправлена 🚀`);
    
    cart = [];
    updateCartUI();
    closeCheckout();
    
    document.getElementById("order-name").value = "";
    document.getElementById("order-phone").value = "";
    document.getElementById("order-address").value = "";
}

// --- 3. КЕРУВАННЯ ВІКНАМИ (MODALS) ---
function closeAllModals() {
    document.getElementById("product-modal").style.display = "none";
    document.getElementById("checkout-modal").style.display = "none";
    document.getElementById("warranty-modal").style.display = "none";
    document.getElementById("contacts-modal").style.display = "none";
}

function openModal(id) {
    closeAllModals();
    const p = products.find(x => x.id === id);
    const details = document.getElementById("modal-details");
    
    details.innerHTML = `
        <div class="modal-img-container">
            <img src="${p.img}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/400?text=Фото'">
        </div>
        <div class="modal-info">
            <h2>${p.name}</h2>
            <p class="rating">⭐ ${p.rating} (відгуки: ${p.reviews.length})</p>
            <p class="description">${p.desc}</p>
            
            <h4>Характеристики:</h4>
            <ul class="spec-list">
                ${p.specs.map(s => `<li>• ${s}</li>`).join('')}
            </ul>

            <h3 class="modal-price">${p.price} ₴</h3>
            
            <div class="action-buttons">
                <button class="btn-buy-now" onclick="quickBuy(${p.id})">Купити зараз</button>
                <button class="btn-add-cart" onclick="addToCart(${p.id})">В кошик</button>
            </div>

            <h4>Відгуки клієнтів:</h4>
            <div class="reviews-section">
                ${p.reviews.map(r => `
                    <div class="review-item">
                        <strong>${r.user}</strong> <span class="stars">${"⭐".repeat(r.stars)}</span>
                        <p>${r.text}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    document.getElementById("product-modal").style.display = "flex";
}

function openCheckout() {
    closeAllModals();
    renderCheckoutCart();
    document.getElementById("checkout-modal").style.display = "flex";
}

function renderCheckoutCart() {
    const list = document.getElementById("checkout-items-list");
    
    if (cart.length === 0) {
        list.innerHTML = "<p>Ваш кошик порожній. Додайте товари з каталогу.</p>";
        document.getElementById("checkout-total-price").textContent = "0 ₴";
        return;
    }

    list.innerHTML = cart.map((item, index) => `
        <div class="checkout-item">
            <img src="${item.img}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60?text=Фото'">
            <div class="checkout-item-info">
                <div class="checkout-item-title">${item.name}</div>
                <div class="checkout-item-price">${item.price} ₴ x ${item.quantity}</div>
            </div>
            <button class="btn-remove-item" onclick="removeFromCart(${index})">🗑️</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById("checkout-total-price").textContent = total + " ₴";
}

function openWarranty() {
    closeAllModals();
    document.getElementById("warranty-modal").style.display = "flex";
}

function openContacts() {
    closeAllModals();
    document.getElementById("contacts-modal").style.display = "flex";
}

function closeModal() { document.getElementById("product-modal").style.display = "none"; }
function closeCheckout() { document.getElementById("checkout-modal").style.display = "none"; }
function closeWarranty() { document.getElementById("warranty-modal").style.display = "none"; }
function closeContacts() { document.getElementById("contacts-modal").style.display = "none"; }

window.onclick = function(event) {
    if (event.target == document.getElementById("product-modal")) closeModal();
    if (event.target == document.getElementById("checkout-modal")) closeCheckout();
    if (event.target == document.getElementById("warranty-modal")) closeWarranty();
    if (event.target == document.getElementById("contacts-modal")) closeContacts();
}

// --- 4. ТЕМНА ТЕМА ---
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    const btn = document.getElementById("theme-toggle");
    btn.textContent = document.body.classList.contains("dark-theme") ? "☀️ Світла тема" : "🌙 Темна тема";
}

// Запуск
renderCatalog();