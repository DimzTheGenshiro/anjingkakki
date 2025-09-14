const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const formTitle = document.getElementById('form-title');

const showLoginLink = document.getElementById('show-login');
const showRegisterLink = document.getElementById('show-register');

const loginUsernameInput = document.getElementById('login-username');
const loginPasswordInput = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');

const registerUsernameInput = document.getElementById('register-username');
const registerPasswordInput = document.getElementById('register-password');
const registerBtn = document.getElementById('register-btn');

const modal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const modalCloseBtn = document.getElementById('modal-close-btn');

function showModal(title, message, callback) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add('show');
    modalCloseBtn.onclick = () => {
        modal.classList.remove('show');
        if (callback) callback();
    };
}

showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
    formTitle.textContent = 'Daftar';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display = 'block';
    formTitle.textContent = 'Masuk';
});

registerBtn.addEventListener('click', () => {
    const username = registerUsernameInput.value.trim();
    const password = registerPasswordInput.value.trim();

    if (username === '' || password === '') {
        showModal('Peringatan!', 'Username dan password tidak boleh kosong.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        showModal('Peringatan!', 'Username sudah terdaftar.');
    } else {
        const newUser = { username: username, password: password, role: 'user' };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        showModal('Sukses!', 'Pendaftaran berhasil. Silakan masuk.', () => {
            registerForm.style.display = 'none';
            loginForm.style.display = 'block';
            formTitle.textContent = 'Masuk';
        });
    }
});

loginBtn.addEventListener('click', () => {
    const username = loginUsernameInput.value.trim();
    const password = loginPasswordInput.value.trim();

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem('loggedInUser', username);
        window.location.href = 'dashboard.html';
    } else {
        showModal('Error!', 'Username atau password salah.');
    }
});
