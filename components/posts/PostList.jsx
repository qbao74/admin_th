"use client";

import Link from "next/link";
import { useState } from "react";
import { useData } from "@/components/DataProvider";
import PageHeading from "@/components/PageHeading";
import ConfirmDialog from "@/components/ConfirmDialog";
import { galleryImage } from "@/lib/images";

export default function PostList() {
  const { posts, postCategoryById, removePost } = useData();
  const [deleting, setDeleting] = useState(null);

  return (
    <>
      <PageHeading
        kicker="Quản lý bài viết"
        title="Danh sách bài viết"
        description="Bài viết kiến thức trà trong dữ liệu."
        actionHref="/them-bai-viet"
        actionLabel="Thêm bài viết"
      />
      <div className="space-y-4">
        {posts.map((post) => {
          const category = postCategoryById(post.id_danh_muc);
          const visible = post.trang_thai !== "an";
          return (
            <article key={post.id} className="bg-white border border-orange-100 rounded-xl p-4 md:p-5 grid md:grid-cols-[120px_1fr_auto] gap-5 items-center">
              <img src={galleryImage(post.id + 12)} alt="" className="w-full md:w-28 h-28 object-cover rounded-xl" />
              <div>
                <h2 className="font-bold text-lg">{post.tieu_de}</h2>
                <p className="text-sm text-gray-500 mt-2">{post.mo_ta_ngan}</p>
                <div className="flex flex-wrap gap-2 mt-3 text-xs font-semibold">
                  <span className="px-3 py-1 rounded-full bg-cream text-caramel">{category?.ten || "Chưa phân loại"}</span>
                  {Number(post.is_featured) === 1 && (
                    <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700">Nổi bật</span>
                  )}
                  <span className={`px-3 py-1 rounded-full ${visible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {visible ? "Đang hiện" : "Đang ẩn"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDeleting(post)}
                className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold"
              >
                <i className="fa-solid fa-trash" />
                Xóa
              </button>
            </article>
          );
        })}
      </div>
      <div className="mt-6">
        <Link href="/them-bai-viet" className="text-sm font-semibold text-terracotta hover:text-caramel">
          Thêm bài viết mới
        </Link>
      </div>
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Xóa bài viết"
        message={deleting ? `Xóa bài “${deleting.tieu_de}” khỏi danh sách?` : ""}
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          removePost(deleting.id);
          setDeleting(null);
        }}
      />
    </>
  );
}
