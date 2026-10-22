"use client";

import { useMemo, useState } from "react";
import { useData } from "@/components/DataProvider";
import PageHeading from "@/components/PageHeading";
import { fieldClass } from "@/components/FormBits";
import { formatPhone } from "@/lib/format";

const ROLE = { 1: "Quản trị", 0: "Khách hàng" };
const GENDER = { nam: "Nam", nu: "Nữ", khac: "Khác" };

export default function UserList() {
  const { users } = useData();
  const [keyword, setKeyword] = useState("");
  const filtered = useMemo(() => {
    const text = keyword.trim().toLowerCase();
    if (!text) return users;
    return users.filter((user) =>
      [user.ho_ten, user.email, user.dia_chi].join(" ").toLowerCase().includes(text),
    );
  }, [users, keyword]);

  return (
    <>
      <PageHeading
        kicker="Quản lý users"
        title="Danh sách users"
        description="Tài khoản trong dữ liệu. Mật khẩu không hiển thị trên giao diện."
      />
      <section className="bg-white rounded-xl shadow-sm p-4 md:p-5 mb-6">
        <label className="block text-sm font-semibold mb-2">Tìm thành viên</label>
        <input
          className={fieldClass}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="Tên, email hoặc địa chỉ"
        />
      </section>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-cream text-left">
              <tr>
                <th className="px-5 py-3 font-semibold">Thành viên</th>
                <th className="px-5 py-3 font-semibold">Liên hệ</th>
                <th className="px-5 py-3 font-semibold">Vai trò</th>
                <th className="px-5 py-3 font-semibold">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((user) => (
                <tr key={user.id}>
                  <td className="px-5 py-4">
                    <div className="font-semibold">{user.ho_ten}</div>
                    <div className="text-gray-500 mt-1">{GENDER[user.gioi_tinh] || "—"} · {user.dia_chi}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div>{user.email}</div>
                    <div className="text-gray-500 mt-1">{formatPhone(user.dien_thoai)}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${user.vai_tro === 1 ? "bg-orange-100 text-orange-700" : "bg-cream text-caramel"}`}>
                      {ROLE[user.vai_tro] || "Thành viên"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {user.trang_thai === "active" ? "Đang hoạt động" : user.trang_thai}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-gray-500">
                    Không tìm thấy thành viên.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
