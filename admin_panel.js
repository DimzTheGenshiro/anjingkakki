const loggedInUser = localStorage.getItem('loggedInUser');
const adminUsernames = ['admin', 'jokowi', 'dimas']; // <-- PASTIKAN USERNAME ANDA DI SINI

if (!loggedInUser || !adminUsernames.includes(loggedInUser)) {
    window.location.href = 'dashboard.html';
}

const pendingOrdersContainer = document.getElementById('pending-orders');
const modal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');

function showModal(title, message, callback) {
    modalTitle.textContent = title;
    modalMessage.innerHTML = message;
    modal.classList.add('show');
    modalCloseBtn.onclick = () => {
        modal.classList.remove('show');
        if (callback) callback();
    };
}

function showPendingOrders() {
    const allUsersOrders = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('orders-')) {
            const orders = JSON.parse(localStorage.getItem(key));
            allUsersOrders.push(...orders);
        }
    }

    const pendingOrders = allUsersOrders.filter(order => order.status === 'menunggu_validasi');

    if (pendingOrders.length === 0) {
        pendingOrdersContainer.innerHTML = '<p>Tidak ada pesanan yang menunggu.</p>';
    } else {
        pendingOrdersContainer.innerHTML = '';
        pendingOrders.forEach(order => {
            const orderCard = document.createElement('div');
            orderCard.className = 'card';
            orderCard.innerHTML = `
                <h4>Pesanan ID: ${order.orderId}</h4>
                <div class="detail-item"><span>Pembeli:</span><p>${order.email}</p></div>
                <div class="detail-item"><span>Produk:</span><p>VPS ${order.ram} GB RAM</p></div>
                <div class="detail-item"><span>Status:</span><p><span class="status status-warning">${order.status.replace(/_/g, ' ').toUpperCase()}</span></p></div>
                <button class="btn btn-secondary view-proof-btn" data-order-id="${order.orderId}" style="margin-top: 15px;">Lihat Bukti Bayar</button>
                <button class="btn btn-primary approve-btn" data-order-id="${order.orderId}" style="margin-top: 10px;">Proses Pesanan</button>
            `;
            pendingOrdersContainer.appendChild(orderCard);
        });

        document.querySelectorAll('.view-proof-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const orderId = e.target.dataset.orderId;
                const order = allUsersOrders.find(o => o.orderId == orderId);
                showModal("Bukti Pembayaran", `<img src="${order.proofOfPayment}" style="max-width: 100%; height: auto; border-radius: 8px;">`);
            });
        });

        document.querySelectorAll('.approve-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const orderId = e.target.dataset.orderId;
                processOrder(orderId);
            });
        });
    }
}

function processOrder(orderId) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('orders-')) {
            const orders = JSON.parse(localStorage.getItem(key));
            const orderIndex = orders.findIndex(o => o.orderId == orderId);
            if (orderIndex !== -1) {
                orders[orderIndex].status = 'aktif';
                localStorage.setItem(key, JSON.stringify(orders));
                showModal("Sukses!", `Pesanan ${orderId} berhasil diproses.`);
                modalCloseBtn.onclick = () => {
                    modal.classList.remove('show');
                    showPendingOrders();
                };
                return;
            }
        }
    }
}

showPendingOrders();
