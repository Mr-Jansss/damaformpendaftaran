// ============================================
// ADMIN DASHBOARD - CLEAN VERSION
// ============================================

console.log('Admin dashboard script loaded');

// ============================================
// DEFINE FUNCTIONS FIRST (before auth check)
// ============================================

// Navigation function
function showSection(sectionName, event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    console.log('showSection called:', sectionName);
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`section-${sectionName}`);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Section shown:', sectionName);
    } else {
        console.error('Section not found:', `section-${sectionName}`);
    }
    
    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
    // Load data based on section
    if (sectionName === 'dashboard') {
        loadDashboardData();
    } else if (sectionName === 'peserta') {
        loadPesertaAdmin();
    } else if (sectionName === 'panitia') {
        loadPanitia();
    } else if (sectionName === 'konten') {
        loadKontenForm();
    }
}

// Logout function
function logout() {
    console.log('logout called');
    if (confirm('Yakin ingin logout?')) {
        console.log('Clearing localStorage and redirecting...');
        localStorage.clear();
        window.location.href = 'login.html';
    }
}

// Close modal function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
    }
}

// Make functions global immediately
window.showSection = showSection;
window.logout = logout;
window.closeModal = closeModal;

console.log('Functions defined and attached to window');
console.log('window.showSection:', typeof window.showSection);
console.log('window.logout:', typeof window.logout);
console.log('window.closeModal:', typeof window.closeModal);

// ============================================
// AUTH CHECK (after functions are defined)
// ============================================

// Check authentication
const token = localStorage.getItem('token');
const userStr = localStorage.getItem('user');

console.log('Token:', token ? 'exists' : 'missing');
console.log('User:', userStr ? 'exists' : 'missing');

let user = null;
let isAuthenticated = false;

if (!token || !userStr) {
    console.error('No auth data, redirecting to login');
    window.location.href = 'login.html';
} else {
    try {
        user = JSON.parse(userStr);
        console.log('User parsed:', user);
        if (!user || user.role !== 'admin') {
            console.error('Not admin, redirecting');
            window.location.href = 'login.html';
        } else {
            isAuthenticated = true;
            console.log('User authenticated as admin');
        }
    } catch (e) {
        console.error('Error parsing user:', e);
        localStorage.clear();
        window.location.href = 'login.html';
    }
}

// Variables
let chartTingkat, chartBidang;
let allPesertaAdmin = [];
let allPanitia = [];

// ============================================
// DASHBOARD
// ============================================

async function loadDashboardData() {
    try {
        const response = await apiCall('/peserta/statistik');
        
        if (response.success) {
            const stats = response.data;
            
            // Update stats cards
            let totalPeserta = 0;
            let totalApproved = 0;
            let totalPending = 0;
            let totalRejected = 0;
            
            if (stats.status) {
                stats.status.forEach(item => {
                    totalPeserta += item.jumlah;
                    if (item.status === 'approved') totalApproved = item.jumlah;
                    if (item.status === 'pending') totalPending = item.jumlah;
                    if (item.status === 'rejected') totalRejected = item.jumlah;
                });
            }
            
            document.getElementById('totalPeserta').textContent = totalPeserta;
            document.getElementById('totalApproved').textContent = totalApproved;
            document.getElementById('totalPending').textContent = totalPending;
            document.getElementById('totalRejected').textContent = totalRejected;
            
            // Create charts
            if (stats.tingkat) {
                createChartTingkat(stats.tingkat);
            }
            if (stats.bidang_lomba) {
                createChartBidang(stats.bidang_lomba);
            }
        }
    } catch (error) {
        console.error('Error loading dashboard:', error);
        showNotification('Gagal memuat data dashboard', 'error');
    }
}

function createChartTingkat(data) {
    const ctx = document.getElementById('chartTingkat');
    if (!ctx) return;
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded!');
        return;
    }
    
    if (chartTingkat) {
        chartTingkat.destroy();
    }
    
    chartTingkat = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.tingkat),
            datasets: [{
                label: 'Jumlah Peserta',
                data: data.map(item => item.jumlah),
                backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(245, 158, 11, 0.8)'],
                borderColor: ['rgb(59, 130, 246)', 'rgb(16, 185, 129)', 'rgb(245, 158, 11)'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
        }
    });
}

function createChartBidang(data) {
    const ctx = document.getElementById('chartBidang');
    if (!ctx) return;
    
    if (typeof Chart === 'undefined') {
        console.error('Chart.js not loaded!');
        return;
    }
    
    if (chartBidang) {
        chartBidang.destroy();
    }
    
    const colors = [
        'rgba(255, 107, 0, 0.8)', 'rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)', 'rgba(239, 68, 68, 0.8)', 'rgba(139, 92, 246, 0.8)', 'rgba(236, 72, 153, 0.8)'
    ];
    
    chartBidang = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: data.map(item => item.bidang_lomba),
            datasets: [{
                data: data.map(item => item.jumlah),
                backgroundColor: colors,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

// ============================================
// PESERTA
// ============================================

async function loadPesertaAdmin() {
    try {
        const response = await apiCall('/peserta');
        
        if (response.success) {
            allPesertaAdmin = response.data;
            displayPesertaAdmin(allPesertaAdmin);
        }
    } catch (error) {
        console.error('Error loading peserta:', error);
        showNotification('Gagal memuat data peserta', 'error');
    }
}

function displayPesertaAdmin(pesertaList) {
    const tbody = document.getElementById('tablePesertaAdmin');
    if (!tbody) return;
    
    if (pesertaList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;">Tidak ada data peserta</td></tr>';
        return;
    }
    
    tbody.innerHTML = pesertaList.map(peserta => {
        const statusColors = {
            'pending': 'badge-warning',
            'approved': 'badge-success',
            'rejected': 'badge-danger'
        };
        
        return `
            <tr>
                <td>${peserta.nama}</td>
                <td>${peserta.asal_sekolah}</td>
                <td><span class="badge badge-info">${peserta.tingkat}</span></td>
                <td>${peserta.bidang_lomba}</td>
                <td><span class="badge ${statusColors[peserta.status]}">${peserta.status.toUpperCase()}</span></td>
                <td>
                    <div class="btn-group">
                        <button type="button" onclick="showDetailPeserta(${peserta.id})" class="btn btn-sm btn-info" title="Detail">👁️</button>
                        <button type="button" onclick="deletePeserta(${peserta.id})" class="btn btn-sm btn-danger" title="Hapus">🗑️</button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function filterPesertaAdmin() {
    const status = document.getElementById('filterStatus').value;
    const search = document.getElementById('searchPesertaAdmin').value.toLowerCase();
    
    let filtered = allPesertaAdmin;
    
    if (status) {
        filtered = filtered.filter(p => p.status === status);
    }
    
    if (search) {
        filtered = filtered.filter(p => 
            p.nama.toLowerCase().includes(search) ||
            p.asal_sekolah.toLowerCase().includes(search) ||
            p.email.toLowerCase().includes(search)
        );
    }
    
    displayPesertaAdmin(filtered);
}

async function showDetailPeserta(id) {
    try {
        const response = await apiCall(`/peserta/${id}`);
        if (response.success) {
            const peserta = response.data;
            const statusColors = {
                'pending': 'badge-warning',
                'approved': 'badge-success',
                'rejected': 'badge-danger'
            };
            
            let berkasHtml = '';
            if (peserta.berkas_url) {
                const fileExt = peserta.berkas_url.split('.').pop().toLowerCase();
                if (fileExt === 'pdf') {
                    berkasHtml = `<a href="${API_BASE_URL.replace('/api', '')}/uploads/${peserta.berkas_url}" target="_blank" class="btn btn-info">Lihat Berkas PDF</a>`;
                } else {
                    berkasHtml = `<img src="${API_BASE_URL.replace('/api', '')}/uploads/${peserta.berkas_url}" alt="Kartu Pelajar" style="max-width:100%;border-radius:0.5rem;">`;
                }
            } else {
                berkasHtml = '<p>Tidak ada berkas</p>';
            }
            
            document.getElementById('detailPesertaContent').innerHTML = `
                <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-bottom:1.5rem;">
                    <div><p style="color:#6b7280;font-size:0.875rem;">Nama Lengkap</p><p style="font-weight:600;">${peserta.nama}</p></div>
                    <div><p style="color:#6b7280;font-size:0.875rem;">Asal Sekolah</p><p style="font-weight:600;">${peserta.asal_sekolah}</p></div>
                    <div><p style="color:#6b7280;font-size:0.875rem;">Email</p><p style="font-weight:600;">${peserta.email}</p></div>
                    <div><p style="color:#6b7280;font-size:0.875rem;">No. WhatsApp</p><p style="font-weight:600;">${peserta.no_wa}</p></div>
                    <div><p style="color:#6b7280;font-size:0.875rem;">Tingkat</p><p style="font-weight:600;">${peserta.tingkat}</p></div>
                    <div><p style="color:#6b7280;font-size:0.875rem;">Bidang Lomba</p><p style="font-weight:600;">${peserta.bidang_lomba}</p></div>
                    <div><p style="color:#6b7280;font-size:0.875rem;">Status</p><span class="badge ${statusColors[peserta.status]}">${peserta.status.toUpperCase()}</span></div>
                    <div><p style="color:#6b7280;font-size:0.875rem;">Tanggal Daftar</p><p style="font-weight:600;">${formatDate(peserta.created_at)}</p></div>
                </div>
                ${peserta.alasan_penolakan ? `<div style="background:#fee2e2;border:1px solid #fecaca;border-radius:0.5rem;padding:1rem;margin-bottom:1.5rem;"><p style="color:#6b7280;font-size:0.875rem;">Alasan Penolakan</p><p style="color:#991b1b;">${peserta.alasan_penolakan}</p></div>` : ''}
                <div style="margin-bottom:1.5rem;"><p style="color:#6b7280;font-size:0.875rem;margin-bottom:0.5rem;">Berkas Kartu Pelajar</p>${berkasHtml}</div>
                ${peserta.status === 'pending' ? `<div style="display:flex;gap:0.5rem;"><button type="button" onclick="updateStatusPeserta(${peserta.id}, 'approved')" class="btn btn-success" style="flex:1;">✅ Setujui</button><button type="button" onclick="rejectPeserta(${peserta.id})" class="btn btn-danger" style="flex:1;">❌ Tolak</button></div>` : ''}
            `;
            
            document.getElementById('modalDetailPeserta').classList.add('active');
        }
    } catch (error) {
        console.error('Error loading detail:', error);
        showNotification('Gagal memuat detail peserta', 'error');
    }
}

async function updateStatusPeserta(id, status, alasan = null) {
    try {
        const response = await apiCall(`/peserta/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status, alasan_penolakan: alasan })
        });
        
        if (response.success) {
            showNotification(response.message, 'success');
            closeModal('modalDetailPeserta');
            loadPesertaAdmin();
            loadDashboardData();
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function rejectPeserta(id) {
    const alasan = prompt('Masukkan alasan penolakan:');
    if (alasan) {
        updateStatusPeserta(id, 'rejected', alasan);
    }
}

async function deletePeserta(id) {
    if (!confirm('Yakin ingin menghapus peserta ini?')) return;
    
    try {
        const response = await apiCall(`/peserta/${id}`, { method: 'DELETE' });
        
        if (response.success) {
            showNotification(response.message, 'success');
            loadPesertaAdmin();
            loadDashboardData();
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

function exportPeserta() {
    const token = localStorage.getItem('token');
    window.open(`${API_BASE_URL}/admin/export/peserta?token=${token}`, '_blank');
    showNotification('Export berhasil dimulai', 'success');
}

// ============================================
// PANITIA
// ============================================

async function loadPanitia() {
    try {
        const response = await apiCall('/admin/users');
        
        if (response.success) {
            allPanitia = response.data;
            displayPanitia(allPanitia);
        }
    } catch (error) {
        console.error('Error loading panitia:', error);
        showNotification('Gagal memuat data panitia', 'error');
    }
}

function displayPanitia(panitiaList) {
    const tbody = document.getElementById('tablePanitia');
    if (!tbody) return;
    
    if (panitiaList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;">Tidak ada data panitia</td></tr>';
        return;
    }
    
    tbody.innerHTML = panitiaList.map(panitia => {
        const roleColors = { 'admin': 'badge-primary', 'panitia': 'badge-info' };
        
        return `
            <tr>
                <td>${panitia.username}</td>
                <td>${panitia.nama_lengkap}</td>
                <td>${panitia.email || '-'}</td>
                <td><span class="badge ${roleColors[panitia.role]}">${panitia.role.toUpperCase()}</span></td>
                <td>
                    <div class="btn-group">
                        <button type="button" onclick="editPanitia(${panitia.id})" class="btn btn-sm btn-warning" title="Edit">✏️</button>
                        ${panitia.id !== user.id ? `<button type="button" onclick="deletePanitia(${panitia.id})" class="btn btn-sm btn-danger" title="Hapus">🗑️</button>` : ''}
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function showModalTambahPanitia() {
    document.getElementById('modalPanitiaTitle').textContent = 'Tambah Panitia';
    document.getElementById('formPanitia').reset();
    document.getElementById('panitiaId').value = '';
    document.getElementById('panitiaPassword').required = true;
    document.getElementById('modalPanitia').classList.add('active');
}

function editPanitia(id) {
    const panitia = allPanitia.find(p => p.id === id);
    if (!panitia) return;
    
    document.getElementById('modalPanitiaTitle').textContent = 'Edit Panitia';
    document.getElementById('panitiaId').value = panitia.id;
    document.getElementById('panitiaUsername').value = panitia.username;
    document.getElementById('panitiaPassword').value = '';
    document.getElementById('panitiaPassword').required = false;
    document.getElementById('panitiaNama').value = panitia.nama_lengkap;
    document.getElementById('panitiaEmail').value = panitia.email || '';
    document.getElementById('panitiaRole').value = panitia.role;
    
    document.getElementById('modalPanitia').classList.add('active');
}

async function deletePanitia(id) {
    if (!confirm('Yakin ingin menghapus panitia ini?')) return;
    
    try {
        const response = await apiCall(`/admin/users/${id}`, { method: 'DELETE' });
        
        if (response.success) {
            showNotification(response.message, 'success');
            loadPanitia();
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// ============================================
// KONTEN
// ============================================

async function loadKontenForm() {
    try {
        const response = await apiCall('/admin/konten');
        
        if (response.success) {
            const konten = response.data;
            const form = document.getElementById('formKonten');
            if (!form) return;
            
            const fields = [
                { key: 'judul_utama', label: 'Judul Utama', type: 'text' },
                { key: 'deskripsi_singkat', label: 'Deskripsi Singkat', type: 'textarea' },
                { key: 'tanggal_pelaksanaan', label: 'Tanggal Pelaksanaan', type: 'text' },
                { key: 'lokasi', label: 'Lokasi', type: 'text' },
                { key: 'kontak_info', label: 'Kontak Info', type: 'text' },
                { key: 'pengumuman', label: 'Pengumuman', type: 'textarea' },
                { key: 'syarat_ketentuan', label: 'Syarat & Ketentuan', type: 'textarea' }
            ];
            
            form.innerHTML = fields.map(field => `
                <div class="form-group">
                    <label class="form-label">${field.label}</label>
                    ${field.type === 'textarea' ? 
                        `<textarea name="${field.key}" rows="4" class="form-input">${konten[field.key] || ''}</textarea>` :
                        `<input type="${field.type}" name="${field.key}" value="${konten[field.key] || ''}" class="form-input">`
                    }
                </div>
            `).join('') + '<button type="submit" class="btn btn-primary" style="width:100%;margin-top:1rem;">💾 Simpan Perubahan</button>';
            
            form.addEventListener('submit', handleKontenSubmit);
        }
    } catch (error) {
        console.error('Error loading konten:', error);
        showNotification('Gagal memuat konten', 'error');
    }
}

async function handleKontenSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    
    try {
        for (let [key, value] of formData.entries()) {
            await apiCall('/admin/konten', {
                method: 'PUT',
                body: JSON.stringify({ kunci_konten: key, isi_konten: value })
            });
        }
        
        showNotification('Konten berhasil diupdate', 'success');
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// ============================================
// MODAL & UTILITIES
// ============================================

// Make other functions global
window.showDetailPeserta = showDetailPeserta;
window.updateStatusPeserta = updateStatusPeserta;
window.rejectPeserta = rejectPeserta;
window.deletePeserta = deletePeserta;
window.exportPeserta = exportPeserta;
window.showModalTambahPanitia = showModalTambahPanitia;
window.editPanitia = editPanitia;
window.deletePanitia = deletePanitia;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');
    
    // Check if authenticated
    if (!isAuthenticated) {
        console.log('Not authenticated, skipping initialization');
        return;
    }
    
    // Set admin name
    if (user) {
        const adminNameEl = document.getElementById('adminName');
        if (adminNameEl) {
            adminNameEl.textContent = user.nama_lengkap;
        }
    }
    
    // Load dashboard
    loadDashboardData();
    
    // Setup filters
    const filterStatus = document.getElementById('filterStatus');
    const searchPeserta = document.getElementById('searchPesertaAdmin');
    
    if (filterStatus) {
        filterStatus.addEventListener('change', filterPesertaAdmin);
    }
    if (searchPeserta) {
        searchPeserta.addEventListener('input', filterPesertaAdmin);
    }
    
    // Setup form panitia
    const formPanitia = document.getElementById('formPanitia');
    if (formPanitia) {
        formPanitia.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const id = formData.get('id');
            const data = {
                username: formData.get('username'),
                nama_lengkap: formData.get('nama_lengkap'),
                email: formData.get('email'),
                role: formData.get('role')
            };
            
            if (formData.get('password')) {
                data.password = formData.get('password');
            }
            
            try {
                let response;
                if (id) {
                    response = await apiCall(`/admin/users/${id}`, {
                        method: 'PUT',
                        body: JSON.stringify(data)
                    });
                } else {
                    data.password = formData.get('password');
                    response = await apiCall('/admin/users', {
                        method: 'POST',
                        body: JSON.stringify(data)
                    });
                }
                
                if (response.success) {
                    showNotification(response.message, 'success');
                    closeModal('modalPanitia');
                    loadPanitia();
                }
            } catch (error) {
                showNotification(error.message, 'error');
            }
        });
    }
    
    console.log('Initialization complete');
});
