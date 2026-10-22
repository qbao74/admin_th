"use client";

import { useState } from "react";
import { useData } from "@/components/DataProvider";
import PageHeading from "@/components/PageHeading";
import { formatDate, formatMoney, formatPhone } from "@/lib/format";
import { PAYMENT_METHOD, orderStatus, paymentStatus } from "@/lib/labels";

export default function OrderList() {
  const { orders, orderItems, productById } = useData();
  const [selected, setSelected] = useState(null);
  const lines = selected ? orderItems.filter((item) => item.id_don_hang === selected.id) : [];

  return (
    <>
      <PageHeading
        kicker="Quản lý đơn hàng"
        title="Danh sách đơn hàng"
        description="Đơn hàng mẫu từ dữ liệu Tea House."
      />
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream text-left">
              <tr>
                <th className="px-5 py-3 font-semibold">Mã đơn</th>
                <th className="px-5 py-3 font-semibold">Khách hàng</th>
                <th className="px-5 py-3 font-semibold">Thời gian</th>
                <th className="px-5 py-3 font-semibold">Thanh toán</th>
                <th className="px-5 py-3 font-semibold">Tổng tiền</th>
                <th className="px-5 py-3 font-semibold">Trạng thái</th>
                <th className="px-5 py-3 font-semibold">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => {
                const status = orderStatus(order.trang_thai);
                const payment = paymentStatus(order.trang_thai_thanh_toan);
                return (
                  <tr key={order.id}>
                    <td className="px-5 py-4 font-semibold">{order.ma_don_hang}</td>
                    <td className="px-5 py-4">
                      <div className="font-semibold">{order.ten_nguoi_nhan}</div>
                      <div className="text-gray-500 mt-1">{formatPhone(order.dien_thoai_nguoi_nhan)}</div>
                    </td>
                    <td className="px-5 py-4">{formatDate(order.thoi_diem_dat_hang)}</td>
                    <td className="px-5 py-4">
                      <div>{PAYMENT_METHOD[order.phuong_thuc_thanh_toan] || order.phuong_thuc_thanh_toan}</div>
                      <span className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-semibold ${payment.className}`}>
                        {payment.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-semibold text-honey">{formatMoney(order.tong_tien_cuoi_cung)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setSelected(order)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-cream text-terracotta hover:bg-orange-100 text-sm font-semibold"
                      >
                        <i className="fa-regular fa-eye" />
                        Xem
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <button type="button" className="absolute inset-0 bg-black/40" aria-label="Đóng" onClick={() => setSelected(null)} />
          <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-start gap-4">
              <div>
                <p className="text-xs uppercase tracking-wider text-terracotta font-semibold">Chi tiết đơn hàng</p>
                <h2 className="text-2xl font-bold mt-1">{selected.ma_don_hang}</h2>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="w-10 h-10 rounded-lg hover:bg-cream" aria-label="Đóng">
                <i className="fa-solid fa-xmark" />
              </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm mt-5">
              <p><span className="text-gray-500">Người nhận: </span>{selected.ten_nguoi_nhan}</p>
              <p><span className="text-gray-500">Điện thoại: </span>{formatPhone(selected.dien_thoai_nguoi_nhan)}</p>
              <p className="sm:col-span-2"><span className="text-gray-500">Địa chỉ: </span>{selected.dia_chi_nguoi_nhan}</p>
              <p><span className="text-gray-500">Phí giao hàng: </span>{formatMoney(selected.phi_giao_hang)}</p>
              <p><span className="text-gray-500">Mã giảm giá: </span>{selected.ma_giam_gia || "Không dùng"}</p>
            </div>
            <div className="mt-5 divide-y divide-orange-100 border border-orange-100 rounded-xl">
              {lines.map((line) => {
                const product = productById(line.id_san_pham);
                return (
                  <div key={line.id} className="flex justify-between gap-4 px-4 py-3 text-sm">
                    <div>
                      <div className="font-semibold">{product?.ten_san_pham || `Sản phẩm #${line.id_san_pham}`}</div>
                      <div className="text-gray-500">Số lượng: {line.so_luong}</div>
                    </div>
                    <div className="font-semibold text-honey">{formatMoney(line.gia * line.so_luong)}</div>
                  </div>
                );
              })}
            </div>
            <p className="text-right font-bold mt-4">Tổng thanh toán: {formatMoney(selected.tong_tien_cuoi_cung)}</p>
          </div>
        </div>
      )}
    </>
  );
}
