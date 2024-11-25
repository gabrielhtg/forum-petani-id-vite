export function formatPostDate(isoString) {
  const date = new Date(isoString);

  // Opsi untuk format tanggal dalam bahasa Indonesia
  const optionsDate = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("id-ID", optionsDate);

  // Format waktu
  const hours = date.getHours().toString().padStart(2, "0"); // Format jam: menit
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${formattedDate} pada ${hours}:${minutes}`;
}
