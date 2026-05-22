// Toggle password visibility
document.getElementById('togglePassword').addEventListener('click', function() {
    const passwordInput = document.getElementById('password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.textContent = '🙈'; // Hide icon
    } else {
        passwordInput.type = 'password';
        this.textContent = '👁️'; // Show icon
    }
});

// Handle login form
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const username = formData.get('username');
    const password = formData.get('password');
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    // Hide error message
    errorMessage.classList.remove('show');
    
    // Disable button
    submitBtn.disabled = true;
    submitBtn.innerHTML = '⏳ Memproses...';
    
    try {
        const response = await apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password })
        });
        
        if (response.success) {
            // Simpan token dan user info
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            
            // Redirect berdasarkan role
            if (response.data.user.role === 'admin') {
                window.location.href = 'admin-dashboard.html';
            } else {
                window.location.href = 'panitia-dashboard.html';
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        errorText.textContent = error.message || 'Login gagal. Silakan coba lagi.';
        errorMessage.classList.add('show');
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

// Clear any existing session on login page load
document.addEventListener('DOMContentLoaded', function() {
    // Jangan auto-redirect, biarkan user login manual
    console.log('Login page loaded');
});
