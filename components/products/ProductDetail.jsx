"use client";

import { productImage } from "@/lib/images";
import { formatMoney } from "@/lib/format";
import { useData } from "@/components/DataProvider";

const DETAIL_FIELDS = [
  ["Xuất xứ", "xuat_xu"],
  ["Vùng trồng", "vung_trong"],
  ["Loại trà", "loai_tra"],
  ["Hương vị", "huong_vi"],
  ["Độ oxy hóa", "do_oxy_hoa"],
  ["Nhiệt độ pha", "nhiet_do_pha"],
  ["Thời gian ủ", "thoi_gian_u"],
  ["Số lần pha", "so_lan_pha"],
  ["Thành phần", "thanh_phan"],
  ["Trọng lượng", "trong_luong"],
  ["Bảo quản", "ghi_chu_bao_quan"],
];

export default function ProductDetail({ product, onClose }) {
  const { categoryById, brandById } = useData();
  if (!product) return null;

  const category = categoryById(product.id_danh_muc);
  const brand = brandById(product.id_thuong_hieu);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/40" aria-label="Đóng" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 p-5 border-b border-orange-100">
          <div>
            <p className="text-xs uppercase tracking-wider text-terracotta font-semibold">Chi tiết sản phẩm</p>
            <h2 className="text-2xl font-bold mt-1">{product.ten_san_pham}</h2>
          </div>
          <button type="button" onClick={onClose} className="w-10 h-10 rounded-lg hover:bg-cream text-gray-500" aria-label="Đóng">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="p-5 grid md:grid-cols-[180px_1fr] gap-5">
          <img src={productImage(product)} alt="" className="w-full h-44 object-cover rounded-xl" />
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500">Danh mục: </span>
              <span className="font-semibold">{category?.ten || "—"}</span>
            </p>
            <p>
              <span className="text-gray-500">Thương hiệu: </span>
              <span className="font-semibold">{brand?.ten || "—"}</span>
            </p>
            <p>
              <span className="text-gray-500">SKU: </span>
              <span className="font-semibold">{product.sku}</span>
            </p>
            <p>
              <span className="text-gray-500">Giá: </span>
              <span className="font-bold text-honey">{formatMoney(product.gia)}</span>
            </p>
            <p className="text-gray-600">{product.mo_ta_ngan}</p>
          </div>
        </div>
        {product.mo_ta_dai && <p className="px-5 pb-2 text-sm text-gray-600">{product.mo_ta_dai}</p>}
        {product.huong_dan_pha && (
          <p className="px-5 pb-4 text-sm">
            <span className="font-semibold">Hướng dẫn pha: </span>
            {product.huong_dan_pha}
          </p>
        )}
        <dl className="grid sm:grid-cols-2 gap-3 px-5 pb-6">
          {DETAIL_FIELDS.filter(([, key]) => product[key]).map(([label, key]) => (
            <div key={key} className="bg-cream rounded-lg px-4 py-3">
              <dt className="text-xs text-gray-500">{label}</dt>
              <dd className="font-semibold mt-1">{product[key]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
