"use client";

import Link from "next/link";
import { useData } from "@/components/DataProvider";
import { formatMoney } from "@/lib/format";
import { orderStatus } from "@/lib/labels";

const QUICK_LINKS = [
  { href: "/them-san-pham", icon: "fa-solid fa-plus", label: "Thêm sản phẩm" },
  { href: "/them-danh-muc", icon: "fa-solid fa-layer-group", label: "Thêm danh mục" },
  { href: "/them-bai-viet", icon: "fa-regular fa-newspaper", label: "Thêm bài viết" },
  { href: "/danh-sach-don-hang", icon: "fa-solid fa-cart-shopping", label: "Xem đơn hàng" },
];

export default function Dashboard() {
  const { products, categories, users, orders } = useData();
  const stats = [
    { label: "Sản phẩm", value: products.length, note: "Tổng sản phẩm", icon: "fa-solid fa-box-open" },
    { label: "Danh mục", value: categories.length, note: "Tổng danh mục", icon: "fa-solid fa-layer-group" },
    { label: "Thành viên", value: users.length, note: "Tài khoản đăng ký", icon: "fa-solid fa-users" },
    { label: "Đơn hàng", value: orders.length, note: "Tổng đơn hàng", icon: "fa-solid fa-cart-shopping" },
  ];

  return (
    <>
      <div className="mb-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <p className="text-[13px] text-honey uppercase tracking-[2px] font-bold mb-1">Dashboard</p>
            <h1 className="text-2xl md:text-3xl font-bold text-forest">Trang chủ quản trị</h1>
            <p className="text-gray-500 mt-2">Tổng quan hoạt động của website Tea House.</p>
          </div>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-orange-200 bg-white hover:bg-cream px-4 py-2.5 rounded-lg text-sm font-semibold text-terracotta"
          >
            <i className="fa-solid fa-arrow-up-right-from-square" />
            Xem website
          </a>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className="text-3xl font-bold mt-2">{stat.value}</div>
                <p className="text-xs text-gray-400 mt-2">{stat.note}</p>
              </div>
              <div className="w-12 h-12 bg-cream text-terracotta rounded-xl flex items-center justify-center text-xl">
                <i className={stat.icon} />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
            <h2 className="font-bold text-lg">Đơn hàng mới</h2>
            <Link href="/danh-sach-don-hang" className="text-sm font-semibold text-terracotta hover:text-caramel">
              Xem tất cả
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-cream text-left">
                <tr>
                  <th className="px-5 py-3 font-semibold">Mã đơn</th>
                  <th className="px-5 py-3 font-semibold">Khách hàng</th>
                  <th className="px-5 py-3 font-semibold">Tổng tiền</th>
                  <th className="px-5 py-3 font-semibold">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => {
                  const status = orderStatus(order.trang_thai);
                  return (
                    <tr key={order.id}>
                      <td className="px-5 py-4 font-semibold">{order.ma_don_hang}</td>
                      <td className="px-5 py-4">{order.ten_nguoi_nhan}</td>
                      <td className="px-5 py-4">{formatMoney(order.tong_tien_cuoi_cung)}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${status.className}`}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <h2 className="font-bold text-lg mb-4">Truy cập nhanh</h2>
          <div className="space-y-3">
            {QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 p-3 rounded-lg bg-cream hover:bg-orange-100 transition"
              >
                <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-terracotta">
                  <i className={link.icon} />
                </div>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
