export function formatProfileDate(isoString) {
  const date = new Date(isoString);

  const optionsDate = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("id-ID", optionsDate);

  return `${formattedDate}`;
}
