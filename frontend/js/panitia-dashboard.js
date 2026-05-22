// ============================================
// PANITIA DASHBOARD
// ============================================

console.log('Panitia dashboard script loaded');

// ============================================
// DEFINE FUNCTIONS FIRST
// ============================================

// Close modal function
function closeModal() {
    const modal = document.getElementById('modalDetailPeserta');
    if (modal) {
        modal.classList.remove('active');
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

// Make functions global immediately
window.closeModal = closeModal;
window.logout = logout;

console.log('Functions defined and attached to window');

// ============================================
// AUTH CHECK
// ============================================

// Check authentication
if (!checkAuth()) {
    window.location.href = 'login.html';
}

const user = getUserInfo();
if (user && user.nama_lengkap) {
    document.getElementById('panitiaName').textContent = user.nama_lengkap;
}

// Variables
let allPeserta = [];

// ============================================
// LOAD & DISPLAY PESERTA
// ============================================

// Load peserta
async function loadPeserta() {
    try {
        const response = await apiCall('/peserta');
        if (response.success) {
            allPeserta = response.data;
            updateStats();
            filterPeserta();
        }
    } catch (error) {
        console.error('Error loading peserta:', error);
        showNotification('Gagal memuat data peserta', 'error');
    }
}

// Update stats
function updateStats() {
    const pending = allPeserta.filter(p => p.status === 'pending').length;
    const approved = allPeserta.filter(p => p.status === 'approved').length;
    const rejected = allPeserta.filter(p => p.status === 'rejected').length;
    
    document.getElementById('totalPending').textContent = pending;
    document.getElementById('totalApproved').textContent = approved;
    document.getElementById('totalRejected').textContent = rejected;
}

// Display peserta
function displayPeserta(pesertaList) {
    const tbody = document.getElementById('tablePeserta');
    
    if (pesertaList.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--gray-500);">Tidak ada data peserta</td></tr>';
        return;
    }
    
    const statusColors = {
        'pending': 'badge-warning',
        'approved': 'badge-success',
        'rejected': 'badge-danger'
    };
    
    tbody.innerHTML = pesertaList.map(peserta => `
        <tr>
            <td>${peserta.nama}</td>
            <td>${peserta.asal_sekolah}</td>
            <td>${peserta.email}</td>
            <td><span class="badge badge-info">${peserta.tingkat}</span></td>
            <td>${peserta.bidang_lomba}</td>
            <td><span class="badge ${statusColors[peserta.status]}">${peserta.status.toUpperCase()}</span></td>
            <td>
                <button type="button" onclick="showDetailPeserta(${peserta.id})" class="btn btn-sm btn-info" title="Detail">👁️</button>
            </td>
        </tr>
    `).join('');
}

// Filter peserta
function filterPeserta() {
    const status = document.getElementById('filterStatus').value;
    const search = document.getElementById('searchPeserta').value.toLowerCase();
    
    let filtered = allPeserta;
    
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
    
    displayPeserta(filtered);
}

// ============================================
// DETAIL & ACTIONS
// ============================================

// Show detail peserta
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
                ${peserta.diproses_oleh_nama ? `<div style="background:#dbeafe;border:1px solid #bfdbfe;border-radius:0.5rem;padding:1rem;margin-bottom:1.5rem;"><p style="color:#6b7280;font-size:0.875rem;">Diproses Oleh</p><p style="color:#1e40af;">${peserta.diproses_oleh_nama}</p></div>` : ''}
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

// Update status peserta
async function updateStatusPeserta(id, status, alasan = null) {
    try {
        const response = await apiCall(`/peserta/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status, alasan_penolakan: alasan })
        });
        
        if (response.success) {
            showNotification(response.message, 'success');
            closeModal();
            loadPeserta();
        }
    } catch (error) {
        showNotification(error.message, 'error');
    }
}

// Reject peserta
function rejectPeserta(id) {
    const alasan = prompt('Masukkan alasan penolakan:');
    if (alasan && alasan.trim()) {
        updateStatusPeserta(id, 'rejected', alasan);
    } else if (alasan !== null) {
        showNotification('Alasan penolakan harus diisi', 'error');
    }
}

// Make functions global
window.showDetailPeserta = showDetailPeserta;
window.updateStatusPeserta = updateStatusPeserta;
window.rejectPeserta = rejectPeserta;

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired');
    
    // Load peserta
    loadPeserta();
    
    // Setup filters
    const filterStatus = document.getElementById('filterStatus');
    const searchPeserta = document.getElementById('searchPeserta');
    
    if (filterStatus) {
        filterStatus.addEventListener('change', filterPeserta);
    }
    if (searchPeserta) {
        searchPeserta.addEventListener('input', filterPeserta);
    }
    
    console.log('Initialization complete');
});
