const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
    window.location.href = 'index.html';
}

const welcomeMessage = document.getElementById('welcome-message');
const adminNavLink = document.getElementById('admin-link');
const logoutBtn = document.getElementById('logout-btn');

const adminUsernames = ['admin', 'jokowi', 'dimas']; // <-- PASTIKAN USERNAME ANDA DI SINI

function showModal(title, message, callback) {
    const modal = document.getElementById('custom-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalMessage = document.getElementById('modal-message');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add('show');
    modalCloseBtn.onclick = () => {
        modal.classList.remove('show');
        if (callback) callback();
    };
}

welcomeMessage.textContent = `Selamat Datang, ${loggedInUser}!`;

if (adminUsernames.includes(loggedInUser)) {
    adminNavLink.style.display = 'flex';
} else {
    adminNavLink.style.display = 'none';
}

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
});
