// Inisialisasi keranjang belanja (array kosong)
let cart = [];

// Fungsi untuk menambahkan item ke keranjang
function addToCart(itemName, itemPrice) {
    // Cek apakah barang sudah ada di keranjang
    let existingItem = cart.find(item => item.name === itemName);
    
    if (existingItem) {
        existingItem.quantity += 1; // Jika ada, tambah jumlahnya
    } else {
        // Jika belum, masukkan sebagai barang baru
        cart.push({
            name: itemName,
            price: itemPrice,
            quantity: 1
        });
    }
    
    // Perbarui tampilan keranjang di layar
    updateCartUI();
}

// Fungsi untuk memperbarui angka dan total harga di tombol mengambang
function updateCartUI() {
    const cartUI = document.getElementById('cart-ui');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // Hitung total barang dan total harga
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += (item.price * item.quantity);
    });

    // Tampilkan angka ke layar
    cartCount.innerText = totalItems;
    
    // Format angka menjadi format Rupiah (hanya pemisah ribuan)
    cartTotal.innerText = totalPrice.toLocaleString('id-ID');

    // Tampilkan atau sembunyikan tombol keranjang warna emas
    if (totalItems > 0) {
        cartUI.style.display = 'block';
    } else {
        cartUI.style.display = 'none';
    }
    
    // Simpan data keranjang ke penyimpanan lokal (Local Storage) browser
    // Ini syarat wajib agar data tidak hilang saat pindah ke halaman checkout
    localStorage.setItem('kedaiCintaCart', JSON.stringify(cart));
}

// Fungsi saat tombol keranjang diklik
function goToCheckout() {
    // Memerintahkan browser untuk pindah ke halaman checkout (akan kita buat setelah ini)
    window.location.href = 'checkout.html';
}

// Jalankan saat halaman pertama kali dimuat (untuk mengecek apakah ada riwayat keranjang sebelumnya)
window.onload = function() {
    let savedCart = localStorage.getItem('kedaiCintaCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}