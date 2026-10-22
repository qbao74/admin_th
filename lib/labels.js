export const ORDER_STATUS = {
  pending: { label: "Chờ xử lý", className: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Đã xác nhận", className: "bg-green-100 text-green-700" },
  shipping: { label: "Đang giao", className: "bg-blue-100 text-blue-700" },
  delivered: { label: "Đã giao", className: "bg-emerald-100 text-emerald-700" },
  cancelled: { label: "Đã hủy", className: "bg-red-100 text-red-600" },
};

export const PAYMENT_STATUS = {
  paid: { label: "Đã thanh toán", className: "bg-green-100 text-green-700" },
  unpaid: { label: "Chưa thanh toán", className: "bg-orange-100 text-orange-700" },
};

export const PAYMENT_METHOD = {
  cod: "Tiền mặt",
  vnpay: "VNPay",
  momo: "MoMo",
};

export function orderStatus(value) {
  return ORDER_STATUS[value] || { label: value || "—", className: "bg-gray-100 text-gray-600" };
}

export function paymentStatus(value) {
  return PAYMENT_STATUS[value] || { label: value || "—", className: "bg-gray-100 text-gray-600" };
}
