// Konfigurasi API
// Sesuaikan dengan port backend Anda (cek backend/.env)
const API_BASE_URL = 'http://localhost:3000/api';

// Helper function untuk API calls
async function apiCall(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Jika ada FormData, hapus Content-Type (browser akan set otomatis)
    if (options.body instanceof FormData) {
        delete defaultHeaders['Content-Type'];
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        console.log('API Call:', `${API_BASE_URL}${endpoint}`, config);
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        console.log('API Response:', data);

        if (!response.ok) {
            throw new Error(data.message || 'Terjadi kesalahan');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Helper untuk menampilkan notifikasi
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Helper untuk format tanggal
function formatDate(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
}

// Helper untuk cek autentikasi
function checkAuth() {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
        return false;
    }
    
    try {
        const user = JSON.parse(userStr);
        if (!user || !user.role) {
            return false;
        }
        return true;
    } catch (e) {
        // Jika error parsing, hapus data corrupt
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        return false;
    }
}

// Helper untuk get user info
function getUserInfo() {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
        return JSON.parse(userStr);
    } catch (e) {
        localStorage.removeItem('user');
        return null;
    }
}
