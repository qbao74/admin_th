"use client";

import Link from "next/link";
import { useState } from "react";
import { useData } from "@/components/DataProvider";
import PageHeading from "@/components/PageHeading";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function PostTypeList() {
  const { postCategories, posts, removePostCategory } = useData();
  const [deleting, setDeleting] = useState(null);

  return (
    <>
      <PageHeading
        kicker="Quản lý loại bài viết"
        title="Danh sách loại bài"
        description="Nhóm nội dung cho các bài viết."
        actionHref="/them-loai-bai-viet"
        actionLabel="Thêm loại bài viết"
      />
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-orange-100">
        <table className="w-full text-sm">
          <thead className="bg-cream text-left">
            <tr>
              <th className="px-5 py-3 font-semibold">Tên</th>
              <th className="px-5 py-3 font-semibold">Slug</th>
              <th className="px-5 py-3 font-semibold">Thứ tự</th>
              <th className="px-5 py-3 font-semibold">Bài viết</th>
              <th className="px-5 py-3 font-semibold">Trạng thái</th>
              <th className="px-5 py-3 font-semibold">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {postCategories.map((category) => {
              const count = posts.filter((post) => post.id_danh_muc === category.id).length;
              const visible = Number(category.trang_thai) === 1;
              return (
                <tr key={category.id}>
                  <td className="px-5 py-4 font-semibold">{category.ten}</td>
                  <td className="px-5 py-4">{category.slug}</td>
                  <td className="px-5 py-4">{category.thu_tu_hien_thi}</td>
                  <td className="px-5 py-4">{count}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${visible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {visible ? "Đang hiện" : "Đang ẩn"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/sua-loai-bai-viet/${category.id}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-100 text-forest hover:bg-cream text-sm font-semibold">
                        <i className="fa-solid fa-pen" />
                        Sửa
                      </Link>
                      <button type="button" onClick={() => setDeleting(category)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold">
                        <i className="fa-solid fa-trash" />
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Xóa loại bài viết"
        message={deleting ? `Xóa loại “${deleting.ten}”?` : ""}
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          removePostCategory(deleting.id);
          setDeleting(null);
        }}
      />
    </>
  );
}
