export function formatMoney(value) {
  if (value == null || value === "") return "—";
  return `${new Intl.NumberFormat("vi-VN").format(Number(value))}đ`;
}

export function formatNumber(value) {
  if (value == null || value === "") return "0";
  return new Intl.NumberFormat("vi-VN").format(Number(value));
}

export function formatPhone(value) {
  if (value == null || value === "") return "—";
  const digits = String(value);
  return digits.startsWith("0") ? digits : `0${digits}`;
}

export function formatDate(value) {
  if (!value) return "—";
  const [date, time = ""] = String(value).split(" ");
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return String(value);
  return time ? `${day}/${month}/${year} ${time.slice(0, 5)}` : `${day}/${month}/${year}`;
}

export function toSlug(text) {
  return String(text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function nextId(list) {
  return list.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;
}
