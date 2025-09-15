const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
    window.location.href = 'index.html';
}

const form = document.getElementById('order-form');
const ramSelect = document.getElementById('ram-select');
const priceDisplay = document.getElementById('price-display');
const locationSelect = document.getElementById('location-select');
const osSelect = document.getElementById('os-select');

// Mengambil input form
const vpsUsernameInput = document.getElementById('vps-username');
const vpsPasswordInput = document.getElementById('vps-password');
const emailInput = document.getElementById('email');

const ramPrices = {
    '1 GB': 10000,
    '2 GB': 20000,
    '4 GB': 40000,
    '8 GB': 80000,
    '16 GB': 150000,
    '32 GB': 280000
};

ramSelect.addEventListener('change', updatePrice);
locationSelect.addEventListener('change', updatePrice);

function updatePrice() {
    const selectedRam = ramSelect.value;
    const basePrice = ramPrices[selectedRam];
    const locationMultiplier = 1; // Untuk saat ini semua lokasi sama

    const totalPrice = basePrice * locationMultiplier;
    priceDisplay.textContent = `Rp${totalPrice.toLocaleString('id-ID')}`;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const orderId = Date.now();
    const selectedRam = ramSelect.value.replace(' GB', '');
    const selectedLocation = locationSelect.value;
    const selectedOs = osSelect.value; // Ambil nilai OS
    const vpsUsername = vpsUsernameInput.value; // Ambil nilai username
    const vpsPassword = vpsPasswordInput.value; // Ambil nilai password
    const userEmail = emailInput.value;
    const totalPrice = ramPrices[ramSelect.value];

    if (!vpsUsername || !vpsPassword || !userEmail) {
        alert("Semua data harus diisi!");
        return;
    }

    const order = {
        orderId: orderId,
        ram: selectedRam,
        location: selectedLocation,
        os: selectedOs,
        vpsUsername: vpsUsername,
        vpsPassword: vpsPassword,
        email: userEmail,
        price: totalPrice,
        totalPayment: 0,
        status: 'pending'
    };

    let userOrders = JSON.parse(localStorage.getItem(`orders-${loggedInUser}`)) || [];
    userOrders.push(order);
    localStorage.setItem(`orders-${loggedInUser}`, JSON.stringify(userOrders));
    
    alert("Pesanan Anda telah dibuat! Silakan lanjutkan ke halaman konfirmasi pembayaran.");
    window.location.href = `payment.html?orderId=${orderId}`;
});

updatePrice();

// Navigasi
const adminNavLink = document.getElementById('admin-link');
const logoutBtn = document.getElementById('logout-btn');
const adminUsernames = ['admin', 'jokowi', 'dimasss']; 

if (adminUsernames.includes(loggedInUser)) {
    adminNavLink.style.display = 'flex';
} else {
    adminNavLink.style.display = 'none';
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
});
