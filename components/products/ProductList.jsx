"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useData } from "@/components/DataProvider";
import PageHeading from "@/components/PageHeading";
import Pagination from "@/components/Pagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import ProductDetail from "@/components/products/ProductDetail";
import { fieldClass } from "@/components/FormBits";
import { productImage } from "@/lib/images";
import { formatMoney, formatNumber } from "@/lib/format";

const PAGE_SIZE = 5;
const EMPTY_FILTER = { category: "", brand: "", status: "" };

export default function ProductList() {
  const { products, categories, brands, categoryById, brandById, removeProduct } = useData();
  const [draft, setDraft] = useState(EMPTY_FILTER);
  const [applied, setApplied] = useState(EMPTY_FILTER);
  const [page, setPage] = useState(1);
  const [viewing, setViewing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const filtered = useMemo(() => {
    return products.filter((product) => {
      if (applied.category && String(product.id_danh_muc) !== applied.category) return false;
      if (applied.brand && String(product.id_thuong_hieu) !== applied.brand) return false;
      if (applied.status && product.trang_thai !== applied.status) return false;
      return true;
    });
  }, [products, applied]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function applyFilter(event) {
    event.preventDefault();
    setApplied(draft);
    setPage(1);
  }

  function resetFilter() {
    setDraft(EMPTY_FILTER);
    setApplied(EMPTY_FILTER);
    setPage(1);
  }

  return (
    <>
      <PageHeading
        kicker="Quản lý sản phẩm"
        title="Danh sách sản phẩm"
        description="Quản lý các sản phẩm trà và dụng cụ pha trà của Tea House."
        actionHref="/them-san-pham"
        actionLabel="Thêm sản phẩm"
      />

      <section className="bg-white rounded-xl shadow-sm p-4 md:p-5 mb-6">
        <form onSubmit={applyFilter}>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Danh mục</label>
              <select
                value={draft.category}
                onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))}
                className={fieldClass}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.ten}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Thương hiệu</label>
              <select
                value={draft.brand}
                onChange={(event) => setDraft((current) => ({ ...current, brand: event.target.value }))}
                className={fieldClass}
              >
                <option value="">Tất cả thương hiệu</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.ten}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Trạng thái</label>
              <select
                value={draft.status}
                onChange={(event) => setDraft((current) => ({ ...current, status: event.target.value }))}
                className={fieldClass}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="hien">Hiện</option>
                <option value="an">Ẩn</option>
              </select>
            </div>
            <div className="flex items-end gap-2">
              <button type="submit" className="flex-1 bg-terracotta hover:bg-caramel text-white rounded-[10px] py-3 font-bold">
                <i className="fa-solid fa-filter mr-2" />
                Lọc
              </button>
              <button
                type="button"
                onClick={resetFilter}
                className="w-12 h-12 border border-orange-200 rounded-lg text-gray-500 hover:bg-cream"
                aria-label="Đặt lại bộ lọc"
              >
                <i className="fa-solid fa-rotate-left" />
              </button>
            </div>
          </div>
        </form>
      </section>

      <p className="text-sm text-gray-500 mb-3">
        Hiển thị {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}–
        {Math.min(currentPage * PAGE_SIZE, filtered.length)} của {filtered.length} sản phẩm
      </p>

      <section>
        <div className="hidden xl:grid grid-cols-[120px_2fr_1.3fr_1.3fr_180px] gap-5 px-5 py-3 bg-cream border border-orange-100 rounded-t-xl text-sm font-semibold">
          <div>Hình</div>
          <div>Sản phẩm</div>
          <div>Thông tin</div>
          <div>Trạng thái</div>
          <div>Thao tác</div>
        </div>

        {visible.length === 0 ? (
          <div className="bg-white border border-orange-100 rounded-xl xl:rounded-none xl:rounded-b-xl xl:border-t-0 p-10 text-center text-gray-500">
            Không có sản phẩm phù hợp bộ lọc.
          </div>
        ) : (
          <div className="space-y-4 xl:space-y-0">
            {visible.map((product, index) => {
              const category = categoryById(product.id_danh_muc);
              const brand = brandById(product.id_thuong_hieu);
              const visibleStatus = product.trang_thai !== "an";
              const isLast = index === visible.length - 1;
              return (
                <article
                  key={product.id}
                  className={`bg-white border border-orange-100 shadow-sm xl:shadow-none p-4 xl:p-5 ${
                    isLast ? "rounded-xl xl:rounded-none xl:rounded-b-xl xl:border-t-0" : "rounded-xl xl:rounded-none xl:border-t-0"
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[120px_2fr_1.3fr_1.3fr_180px] gap-5 items-center">
                    <img
                      src={productImage(product)}
                      alt={product.ten_san_pham}
                      className="w-28 h-28 md:w-32 md:h-32 xl:w-24 xl:h-24 object-cover rounded-xl"
                    />

                    <div>
                      <div className="text-xs text-gray-400 xl:hidden mb-1">Sản phẩm</div>
                      <h2 className="font-bold text-lg">{product.ten_san_pham}</h2>
                      <div className="mt-3 space-y-2 text-sm">
                        <div>
                          <span className="text-gray-500">Danh mục: </span>
                          <span className="font-semibold">{category?.ten || "—"}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Thương hiệu: </span>
                          <span className="font-semibold">{brand?.ten || "—"}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 xl:hidden mb-2">Thông tin</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-tag text-terracotta w-5" />
                          <span className="text-gray-500">Giá:</span>
                          <span className="font-bold text-honey">{formatMoney(product.gia)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="fa-solid fa-box text-terracotta w-5" />
                          <span className="text-gray-500">Tồn kho:</span>
                          <span className="font-semibold">{formatNumber(product.so_luong_ton_kho)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="fa-regular fa-eye text-terracotta w-5" />
                          <span className="text-gray-500">Lượt xem:</span>
                          <span className="font-semibold">{formatNumber(product.so_lan_xem)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 xl:hidden mb-2">Trạng thái</div>
                      <div className="space-y-3">
                        {Number(product.noi_bat) === 1 ? (
                          <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                            <i className="fa-solid fa-star" />
                            Nổi bật
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-xs font-semibold">
                            Không nổi bật
                          </span>
                        )}
                        <div>
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              visibleStatus ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {visibleStatus ? "Đang hiện" : "Đang ẩn"}
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">SKU: </span>
                          <span className="font-semibold">{product.sku}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-400 xl:hidden mb-2">Thao tác</div>
                      <div className="flex xl:flex-col flex-wrap gap-2">
                        <Link
                          href={`/sua-san-pham/${product.id}`}
                          className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-orange-100 text-forest hover:bg-cream text-sm font-semibold"
                        >
                          <i className="fa-solid fa-pen" />
                          Sửa
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleting(product)}
                          className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 text-sm font-semibold"
                        >
                          <i className="fa-solid fa-trash" />
                          Xóa
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewing(product)}
                          className="inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cream text-terracotta hover:bg-orange-100 text-sm font-semibold"
                        >
                          <i className="fa-regular fa-eye" />
                          Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <Pagination page={currentPage} pageCount={pageCount} onChange={setPage} />

      <ProductDetail product={viewing} onClose={() => setViewing(null)} />
      <ConfirmDialog
        open={Boolean(deleting)}
        title="Xóa sản phẩm"
        message={deleting ? `Bạn có chắc muốn xóa “${deleting.ten_san_pham}”? Thao tác này chỉ cập nhật trên giao diện.` : ""}
        onCancel={() => setDeleting(null)}
        onConfirm={() => {
          if (!deleting) return;
          removeProduct(deleting.id);
          setDeleting(null);
        }}
      />
    </>
  );
}
