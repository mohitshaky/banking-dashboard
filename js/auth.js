/**
 * auth.js — Login, logout, and session guard for MB Bank
 * Handles sessionStorage-based auth state across pages.
 */

// Mock credentials — in a real system this hits an API endpoint
const MOCK_CREDENTIALS = {
  username: 'user',
  password: 'password123'
};

// ----------------------------------------------------------------
// Session helpers
// ----------------------------------------------------------------

function isLoggedIn() {
  return sessionStorage.getItem('mb_auth') === 'true';
}

function setLoggedIn(username) {
  sessionStorage.setItem('mb_auth', 'true');
  sessionStorage.setItem('mb_user', username);
  sessionStorage.setItem('mb_login_time', Date.now().toString());
}

function clearSession() {
  sessionStorage.removeItem('mb_auth');
  sessionStorage.removeItem('mb_user');
  sessionStorage.removeItem('mb_login_time');
}

function getCurrentUser() {
  return sessionStorage.getItem('mb_user') || 'user';
}

// ----------------------------------------------------------------
// Session guard — redirect to login if not authenticated
// Call on protected pages (dashboard, transactions)
// ----------------------------------------------------------------

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}

// ----------------------------------------------------------------
// Logout — wipe session and go back to login
// ----------------------------------------------------------------

function logout() {
  clearSession();
  window.location.href = 'index.html';
}

// ----------------------------------------------------------------
// Login page logic
// ----------------------------------------------------------------

function initLoginPage() {
  const form        = document.getElementById('loginForm');
  const usernameEl  = document.getElementById('username');
  const passwordEl  = document.getElementById('password');
  const loginBtn    = document.getElementById('loginBtn');
  const loginError  = document.getElementById('loginError');
  const toggleBtn   = document.getElementById('togglePassword');

  // If already logged in, skip to dashboard
  if (isLoggedIn()) {
    window.location.href = 'dashboard.html';
    return;
  }

  // Show / hide password toggle
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function() {
      const isText = passwordEl.type === 'text';
      passwordEl.type = isText ? 'password' : 'text';
      // Swap the eye icon
      const eyeIcon = document.getElementById('eyeIcon');
      if (eyeIcon) {
        eyeIcon.innerHTML = isText
          ? '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'
          : '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>' +
            '<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>' +
            '<line x1="1" y1="1" x2="23" y2="23"/>';
      }
    });
  }

  // Clear errors on input
  usernameEl && usernameEl.addEventListener('input', () => clearFieldError('usernameError', usernameEl));
  passwordEl && passwordEl.addEventListener('input', () => clearFieldError('passwordError', passwordEl));

  // Form submission
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      handleLogin();
    });
  }

  function handleLogin() {
    const username = usernameEl.value.trim();
    const password = passwordEl.value;
    let valid = true;

    // Hide previous login error
    loginError.classList.remove('visible');

    // Validate fields
    if (!username) {
      showFieldError('usernameError', usernameEl);
      valid = false;
    }
    if (!password) {
      showFieldError('passwordError', passwordEl);
      valid = false;
    }
    if (!valid) return;

    // Simulate a brief network call — gives it a real feel
    loginBtn.classList.add('loading');
    loginBtn.textContent = 'Authenticating…';

    setTimeout(function() {
      if (username === MOCK_CREDENTIALS.username && password === MOCK_CREDENTIALS.password) {
        setLoggedIn(username);
        window.location.href = 'dashboard.html';
      } else {
        loginBtn.classList.remove('loading');
        loginBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          Secure Login`;
        loginError.classList.add('visible');

        // Shake animation on the card
        const card = document.querySelector('.login-card');
        if (card) {
          card.style.animation = 'shake 0.4s ease';
          setTimeout(() => { card.style.animation = ''; }, 400);
        }
      }
    }, 900); // 900ms simulated latency
  }
}

function showFieldError(errorId, inputEl) {
  const el = document.getElementById(errorId);
  if (el) el.classList.add('visible');
  if (inputEl) inputEl.classList.add('error');
}

function clearFieldError(errorId, inputEl) {
  const el = document.getElementById(errorId);
  if (el) el.classList.remove('visible');
  if (inputEl) inputEl.classList.remove('error');
}

// ----------------------------------------------------------------
// Logout button wiring — present on dashboard + transactions
// ----------------------------------------------------------------

function initLogoutButton() {
  const btn = document.getElementById('logoutBtn');
  if (btn) {
    btn.addEventListener('click', function() {
      logout();
    });
  }
}

// ----------------------------------------------------------------
// Toast helper — quick feedback messages
// ----------------------------------------------------------------

function showToast(message, duration) {
  duration = duration || 3000;
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity   = '1';
  setTimeout(function() {
    toast.style.transform = 'translateY(80px)';
    toast.style.opacity   = '0';
  }, duration);
}

// ----------------------------------------------------------------
// Auto-init based on current page
// ----------------------------------------------------------------

(function() {
  const page = window.location.pathname.split('/').pop() || 'index.html';

  if (page === 'index.html' || page === '') {
    // Login page — init form
    document.addEventListener('DOMContentLoaded', initLoginPage);

  } else if (page === 'dashboard.html' || page === 'transactions.html') {
    // Protected pages — guard session first
    document.addEventListener('DOMContentLoaded', function() {
      if (requireAuth()) {
        initLogoutButton();
      }
    });
  }
})();

// CSS shake animation injection (avoids adding it to CSS files just for auth)
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-5px); }
    80%       { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);
