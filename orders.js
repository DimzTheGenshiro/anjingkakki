const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
    window.location.href = 'index.html';
}

const ramCarousel = document.getElementById('ram-carousel');
const osSelect = document.getElementById('os-select');
const locationSelect = document.getElementById('location-select');
const vpsUsernameInput = document.getElementById('vps-username');
const vpsPasswordInput = document.getElementById('vps-password');
const buyerEmailInput = document.getElementById('buyer-email');
const vpsPriceSpan = document.getElementById('vps-price');
const checkoutBtn = document.getElementById('checkout-btn');
const logoutBtn = document.getElementById('logout-btn');
const adminNavLink = document.getElementById('admin-link');

const modal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');

const vpsPrices = {
    '2': 20000,
    '4': 40000,
    '8': 80000,
    '16': 150000
};

// Update price and carousel active state
function updatePrice() {
    const activeItem = document.querySelector('.carousel-item.active');
    const selectedRam = activeItem ? activeItem.dataset.ram : '2';
    vpsPriceSpan.textContent = `Rp${vpsPrices[selectedRam].toLocaleString('id-ID')}`;
}

ramCarousel.addEventListener('click', (e) => {
    const item = e.target.closest('.carousel-item');
    if (item) {
        document.querySelectorAll('.carousel-item').forEach(el => el.classList.remove('active'));
        item.classList.add('active');
        updatePrice();
    }
});

checkoutBtn.addEventListener('click', () => {
    if (!vpsUsernameInput.value || !vpsPasswordInput.value || !buyerEmailInput.value) {
        showModal("Peringatan!", "Silakan lengkapi semua data formulir.");
        return;
    }

    const selectedRamItem = document.querySelector('.carousel-item.active');
    const ram = selectedRamItem ? selectedRamItem.dataset.ram : '2';
    const os = osSelect.value;
    const location = locationSelect.value;
    const username = vpsUsernameInput.value;
    const password = vpsPasswordInput.value;
    const email = buyerEmailInput.value;
    const price = vpsPrices[ram];

    const orderData = {
        ram: ram,
        os: os,
        location: location,
        username: username,
        password: password,
        email: email,
        price: price,
        status: 'menunggu_pembayaran',
        orderId: Date.now()
    };

    const existingOrders = JSON.parse(localStorage.getItem(`orders-${loggedInUser}`)) || [];
    existingOrders.push(orderData);
    localStorage.setItem(`orders-${loggedInUser}`, JSON.stringify(existingOrders));

    window.location.href = `checkout.html?orderId=${orderData.orderId}`;
});

function showModal(title, message, callback) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add('show');
    modalCloseBtn.onclick = () => {
        modal.classList.remove('show');
        if (callback) callback();
    };
}

const users = JSON.parse(localStorage.getItem('users')) || [];
const currentUser = users.find(u => u.username === loggedInUser);
if (currentUser && currentUser.role === 'admin') {
    adminNavLink.style.display = 'flex';
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
});

// Initial price display
updatePrice();
