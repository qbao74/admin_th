"use client";

import Link from "next/link";
import { useState } from "react";
import { useData } from "@/components/DataProvider";
import PageHeading from "@/components/PageHeading";
import ConfirmDialog from "@/components/ConfirmDialog";
import { galleryImage } from "@/lib/images";

export default function CategoryList() {
  const { categories, products, removeCategory } = useData();
  const [deleting, setDeleting] = useState(null);

  return (
    <>
      <PageHeading
        kicker="Quản lý danh mục"
        title="Danh sách danh mục"
        description="Các nhóm sản phẩm đang có trong dữ liệu Tea House."
        actionHref="/them-danh-muc"
        actionLabel="Thêm danh mục"
      />

      <section>
        <div className="hidden xl:grid grid-cols-[120px_2fr_1fr_1fr_180px] gap-5 px-5 py-3 bg-cream border border-orange-100 rounded-t-xl text-sm font-semibold">
          <div>Hình</div>
          <div>Danh mục</div>
          <div>Thứ tự</div>
          <div>Trạng thái</div>
          <div>Thao tác</div>
        </div>
        <div className="space-y-4 xl:space-y-0">
          {categories.map((category, index) => {
            const count = products.filter((product) => product.id_danh_muc === category.id).length;
            const visible = Number(category.trang_thai) === 1;
            const isLast = index === categories.length - 1;
            return (
              <article
                key={category.id}
                className={`bg-white border border-orange-100 p-4 xl:p-5 ${
                  isLast ? "rounded-xl xl:rounded-none xl:rounded-b-xl xl:border-t-0" : "rounded-xl xl:rounded-none xl:border-t-0"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[120px_2fr_1fr_1fr_180px] gap-5 items-center">
                  <img src={galleryImage(category.id + 3)} alt="" className="w-24 h-24 object-cover rounded-xl" />
                  <div>
                    <h2 className="font-bold text-lg">{category.ten}</h2>
                    <p className="text-sm text-gray-500 mt-1">Slug: {category.slug}</p>
                    <p className="text-sm mt-1">{count} sản phẩm</p>
                  </div>
                  <div className="font-semibold">{category.thu_tu_hien_thi}</div>
                  <div>
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${visible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {visible ? "Đang hiện" : "Đang ẩn"}
                    </span>
                  </div>
                  <div className="flex xl:flex-col flex-wrap gap-2">
                    <Link href={`/sua-danh-muc/${category.id}`} className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-orange-100 text-forest hover:bg-cream text-sm font-semibold">
                      <i className="fa-solid fa-pen" />
                      Sửa
                    </Link>
                    <button type="button" onClick={() => setDeleting(category)} className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold">
                      <i className="fa-solid fa-trash" />
                      Xóa
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <ConfirmDialog
        open={Boolean(deleting)}
        title="Xóa danh mục"
        message={deleting ? `Xóa danh mục “${deleting.ten}” khỏi giao diện quản trị?` : ""}
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          removeCategory(deleting.id);
          setDeleting(null);
        }}
      />
    </>
  );
}
