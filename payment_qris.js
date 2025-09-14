const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
    window.location.href = 'index.html';
}

const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderId');

if (!orderId) {
    window.location.href = 'dashboard.html';
}

const totalPaymentDisplay = document.getElementById('total-payment-display');
const uploadBtn = document.getElementById('upload-btn');
const fileInput = document.getElementById('proof-of-payment');

const modal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');

const existingOrders = JSON.parse(localStorage.getItem(`orders-${loggedInUser}`)) || [];
const order = existingOrders.find(o => o.orderId == orderId);

if (order) {
    totalPaymentDisplay.textContent = `Rp${order.totalPayment.toLocaleString('id-ID')}`;
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

uploadBtn.addEventListener('click', () => {
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            order.proofOfPayment = event.target.result;
            order.status = 'menunggu_validasi';

            localStorage.setItem(`orders-${loggedInUser}`, JSON.stringify(existingOrders));

            showModal('Sukses!', 'Bukti pembayaran berhasil diunggah. Pesanan Anda akan diproses dan dikirim melalui email.');

            modalCloseBtn.onclick = () => {
                modal.classList.remove('show');
                window.location.href = 'dashboard.html';
            };
        };
        reader.readAsDataURL(file);
    } else {
        showModal('Peringatan!', 'Silakan pilih file bukti pembayaran.');
    }
});
