export function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Menentukan jumlah desimal (biasanya 0 untuk Rupiah)
    }).format(number);
}