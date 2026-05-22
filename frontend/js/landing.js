// Mapping bidang lomba berdasarkan tingkat
const bidangLombaMap = {
    'SD': ['Matematika', 'IPA'],
    'SMP': ['Matematika', 'Biologi'],
    'SMA': ['Matematika', 'Biologi', 'Fisika', 'Astronomi', 'Kimia', 'Ilmu Komputer', 'Statistika']
};

// Load konten halaman
async function loadKontenHalaman() {
    try {
        const response = await apiCall('/admin/konten');
        if (response.success) {
            const konten = response.data;
            
            // Update konten di halaman
            if (konten.judul_utama) document.getElementById('judulUtama').textContent = konten.judul_utama;
            if (konten.deskripsi_singkat) document.getElementById('deskripsiSingkat').textContent = konten.deskripsi_singkat;
            if (konten.tanggal_pelaksanaan) document.getElementById('tanggalPelaksanaan').textContent = konten.tanggal_pelaksanaan;
            if (konten.lokasi) document.getElementById('lokasi').textContent = konten.lokasi;
            if (konten.pengumuman) document.getElementById('pengumuman').textContent = konten.pengumuman;
            if (konten.kontak_info) document.getElementById('kontakInfo').textContent = konten.kontak_info;
        }
    } catch (error) {
        console.error('Error loading konten:', error);
    }
}

// Handle perubahan tingkat sekolah
document.getElementById('tingkat').addEventListener('change', function() {
    const tingkat = this.value;
    const bidangLombaSelect = document.getElementById('bidangLomba');
    
    bidangLombaSelect.innerHTML = '<option value="">Pilih Bidang Lomba</option>';
    
    if (tingkat && bidangLombaMap[tingkat]) {
        bidangLombaSelect.disabled = false;
        bidangLombaMap[tingkat].forEach(bidang => {
            const option = document.createElement('option');
            option.value = bidang;
            option.textContent = bidang;
            bidangLombaSelect.appendChild(option);
        });
    } else {
        bidangLombaSelect.disabled = true;
    }
});

// Handle form pendaftaran
document.getElementById('formDaftar').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Mengirim...';
    
    try {
        const response = await fetch(`${API_BASE_URL}/peserta/daftar`, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showNotification('Pendaftaran berhasil! Silakan tunggu konfirmasi dari panitia.', 'success');
            this.reset();
            document.getElementById('bidangLomba').disabled = true;
        } else {
            showNotification(data.message || 'Pendaftaran gagal', 'error');
        }
    } catch (error) {
        showNotification(error.message || 'Terjadi kesalahan', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
});

// Load dan tampilkan peserta approved
let allPeserta = [];

async function loadPesertaApproved() {
    try {
        const response = await apiCall('/peserta/approved');
        if (response.success) {
            allPeserta = response.data;
            displayPeserta(allPeserta);
        }
    } catch (error) {
        console.error('Error loading peserta:', error);
        document.getElementById('tablePeserta').innerHTML = `
            <tr>
                <td colspan="5" class="px-4 py-8 text-center text-red-500">
                    <i class="fas fa-exclamation-triangle text-2xl mb-2"></i>
                    <p>Gagal memuat data peserta</p>
                </td>
            </tr>
        `;
    }
}

function displayPeserta(pesertaList) {
    const tbody = document.getElementById('tablePeserta');
    
    if (pesertaList.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="px-4 py-8 text-center text-gray-500">
                    <i class="fas fa-inbox text-2xl mb-2"></i>
                    <p>Belum ada peserta terkonfirmasi</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = pesertaList.map((peserta, index) => `
        <tr class="hover:bg-gray-50">
            <td class="px-4 py-3">${index + 1}</td>
            <td class="px-4 py-3 font-semibold">${peserta.nama}</td>
            <td class="px-4 py-3">${peserta.asal_sekolah}</td>
            <td class="px-4 py-3">
                <span class="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                    ${peserta.tingkat}
                </span>
            </td>
            <td class="px-4 py-3">${peserta.bidang_lomba}</td>
        </tr>
    `).join('');
}

// Search peserta
document.getElementById('searchPeserta').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    const filtered = allPeserta.filter(peserta => 
        peserta.nama.toLowerCase().includes(searchTerm) ||
        peserta.asal_sekolah.toLowerCase().includes(searchTerm)
    );
    
    displayPeserta(filtered);
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadKontenHalaman();
    loadPesertaApproved();
});
