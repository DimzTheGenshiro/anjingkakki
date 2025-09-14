const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
    window.location.href = 'index.html';
}

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

if (!orderId) {
    window.location.href = 'dashboard.html';
}

const productDisplay = document.getElementById('product-display');
const osDisplay = document.getElementById('os-display');
const locationDisplay = document.getElementById('location-display');
const priceDisplay = document.getElementById('price-display');
const feeDisplay = document.getElementById('fee-display');
const totalPriceDisplay = document.getElementById('total-price-display');

const qrisBtn = document.getElementById('qris-btn');
const danaBtn = document.getElementById('dana-btn');

const modal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');

const existingOrders = JSON.parse(localStorage.getItem(`orders-${loggedInUser}`)) || [];
const order = existingOrders.find(o => o.orderId == orderId);

if (order) {
    const randomFee = parseFloat((Math.random() * 500).toFixed(2));
    const totalPayment = order.price + randomFee;

    order.totalPayment = totalPayment;
    order.fee = randomFee;
    localStorage.setItem(`orders-${loggedInUser}`, JSON.stringify(existingOrders));

    productDisplay.textContent = `VPS ${order.ram} GB RAM`;
    osDisplay.textContent = order.os.toUpperCase();
    locationDisplay.textContent = order.location.toUpperCase();
    priceDisplay.textContent = `Rp${order.price.toLocaleString('id-ID')}`;
    feeDisplay.textContent = `Rp${randomFee.toLocaleString('id-ID')}`;
    totalPriceDisplay.textContent = `Rp${totalPayment.toLocaleString('id-ID')}`;

    qrisBtn.addEventListener('click', () => {
        window.location.href = `payment_qris.html?orderId=${orderId}`;
    });

    danaBtn.addEventListener('click', () => {
        showModal("Info", "Pembayaran Dana sedang dalam pengembangan.");
    });

} else {
    showModal("Error!", "Pesanan tidak ditemukan.", () => {
        window.location.href = 'dashboard.html';
    });
}

function showModal(title, message, callback) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add('show');
    modalCloseBtn.onclick = () => {
        modal.classList.remove('show');
        if (callback) callback();
    };
}
