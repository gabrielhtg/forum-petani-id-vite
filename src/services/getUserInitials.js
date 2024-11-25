export function getUserInitials(name) {
  const words = name.trim().split(/\s+/);

  return words.map((word) => word[0].toUpperCase()).join("");
}
