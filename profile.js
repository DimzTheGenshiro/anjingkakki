const loggedInUser = localStorage.getItem('loggedInUser');
if (!loggedInUser) {
    window.location.href = 'index.html';
}

const profileUsernameInput = document.getElementById('profile-username');
const profileStatusInput = document.getElementById('profile-status');
const oldPasswordInput = document.getElementById('old-password');
const newPasswordInput = document.getElementById('new-password');
const confirmNewPasswordInput = document.getElementById('confirm-new-password');
const changePasswordBtn = document.getElementById('change-password-btn');
const adminNavLink = document.getElementById('admin-link');
const logoutBtn = document.getElementById('logout-btn');

const modal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');

const adminUsernames = ['admin', 'jokowi', 'dimas']; // <-- PASTIKAN USERNAME ANDA DI SINI

function showModal(title, message, callback) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add('show');
    modalCloseBtn.onclick = () => {
        modal.classList.remove('show');
        if (callback) callback();
    };
}

if (adminUsernames.includes(loggedInUser)) {
    adminNavLink.style.display = 'flex';
} else {
    adminNavLink.style.display = 'none';
}

const users = JSON.parse(localStorage.getItem('users')) || [];
const currentUser = users.find(u => u.username === loggedInUser);

if (currentUser) {
    profileUsernameInput.value = currentUser.username;
    if (adminUsernames.includes(currentUser.username)) {
        profileStatusInput.value = 'Admin';
    } else {
        profileStatusInput.value = 'Pelanggan';
    }
}

changePasswordBtn.addEventListener('click', () => {
    const oldPassword = oldPasswordInput.value;
    const newPassword = newPasswordInput.value;
    const confirmNewPassword = confirmNewPasswordInput.value;

    if (oldPassword === '' || newPassword === '' || confirmNewPassword === '') {
        showModal('Peringatan!', 'Semua field harus diisi.');
        return;
    }

    if (currentUser.password !== undefined && oldPassword !== currentUser.password) {
        showModal('Error!', 'Password lama salah.');
        return;
    }

    if (newPassword !== confirmNewPassword) {
        showModal('Error!', 'Konfirmasi password baru tidak cocok.');
        return;
    }

    currentUser.password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    showModal('Sukses!', 'Password berhasil diubah.');
    
    oldPasswordInput.value = '';
    newPasswordInput.value = '';
    confirmNewPasswordInput.value = '';
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
});
