"use client";

import { useData } from "@/components/DataProvider";
import { Choice, Field, FormCard, fieldClass } from "@/components/FormBits";
import PageHeading from "@/components/PageHeading";
import { toSlug } from "@/lib/format";
import { galleryImage } from "@/lib/images";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const EMPTY = {
  ten_san_pham: "",
  slug: "",
  sku: "",
  gia: "",
  so_luong_ton_kho: "",
  id_danh_muc: "",
  id_thuong_hieu: "",
  trong_luong: "",
  trang_thai: "hien",
  noi_bat: 0,
  mo_ta_ngan: "",
  mo_ta_dai: "",
  xuat_xu: "",
  loai_tra: "",
  huong_vi: "",
  nhiet_do_pha: "",
  thoi_gian_u: "",
};

export default function ProductForm({ productId }) {
  const router = useRouter();
  const { products, categories, brands, addProduct, updateProduct } = useData();
  const existing = productId ? products.find((item) => item.id === Number(productId)) : null;
  const [slugTouched, setSlugTouched] = useState(Boolean(existing));
  const [form, setForm] = useState(() => (existing ? { ...EMPTY, ...existing, gia: existing.gia ?? "", so_luong_ton_kho: existing.so_luong_ton_kho ?? "" } : { ...EMPTY, id_danh_muc: categories[0]?.id || "", id_thuong_hieu: brands[0]?.id || "" }));
  const [error, setError] = useState("");

  if (productId && !existing) {
    return <p className="text-gray-500">Không tìm thấy sản phẩm.</p>;
  }

  function setField(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleName(value) {
    setForm((current) => ({
      ...current,
      ten_san_pham: value,
      slug: slugTouched ? current.slug : toSlug(value),
    }));
  }

  function handleImage(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Chỉ chọn file hình ảnh.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setField("hinh_chinh", String(reader.result || ""));
      setError("");
    };
    reader.readAsDataURL(file);
  }

  const uploaded = typeof form.hinh_chinh === "string" && form.hinh_chinh.startsWith("data:");
  const preview = uploaded ? form.hinh_chinh : existing ? galleryImage(existing.id) : "";

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.ten_san_pham.trim() || !form.slug.trim() || !form.sku.trim()) {
      setError("Nhập tên, slug và SKU trước khi lưu.");
      return;
    }
    const payload = {
      ...form,
      gia: Number(form.gia) || 0,
      so_luong_ton_kho: Number(form.so_luong_ton_kho) || 0,
      id_danh_muc: Number(form.id_danh_muc),
      id_thuong_hieu: Number(form.id_thuong_hieu),
      noi_bat: Number(form.noi_bat),
    };
    if (existing) updateProduct(existing.id, payload);
    else addProduct(payload);
    router.push("/danh-sach-san-pham");
  }

  return (
    <>
      <PageHeading
        kicker="Quản lý sản phẩm"
        title={existing ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        description="Form giao diện. Dữ liệu chỉ lưu tạm trong phiên làm việc, chưa gửi lên server."
      />
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormCard title="Thông tin sản phẩm" description="Thông tin cơ bản dùng để hiển thị sản phẩm.">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            <Field label="Tên sản phẩm" required hint="Nhập tên đầy đủ của sản phẩm.">
              <input className={fieldClass} value={form.ten_san_pham} onChange={(event) => handleName(event.target.value)} placeholder="Ví dụ: Trà Xanh Phúc Long" />
            </Field>
            <Field label="Slug" required>
              <input
                className={fieldClass}
                value={form.slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setField("slug", event.target.value);
                }}
                placeholder="tra-xanh-phuc-long"
              />
            </Field>
            <Field label="SKU" required>
              <input className={fieldClass} value={form.sku} onChange={(event) => setField("sku", event.target.value)} placeholder="TH-TEA-001" />
            </Field>
            <Field label="Giá" required>
              <input className={fieldClass} type="number" min="0" value={form.gia} onChange={(event) => setField("gia", event.target.value)} />
            </Field>
            <Field label="Tồn kho">
              <input className={fieldClass} type="number" min="0" value={form.so_luong_ton_kho} onChange={(event) => setField("so_luong_ton_kho", event.target.value)} />
            </Field>
            <Field label="Trọng lượng">
              <input className={fieldClass} value={form.trong_luong || ""} onChange={(event) => setField("trong_luong", event.target.value)} placeholder="100g" />
            </Field>
            <Field label="Danh mục" required>
              <select className={fieldClass} value={form.id_danh_muc} onChange={(event) => setField("id_danh_muc", event.target.value)}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.ten}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Thương hiệu" required>
              <select className={fieldClass} value={form.id_thuong_hieu} onChange={(event) => setField("id_thuong_hieu", event.target.value)}>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.ten}
                  </option>
                ))}
              </select>
            </Field>
          </div>
          <div className="mt-5">
            <p className="font-semibold mb-2">Hình ảnh</p>
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-36 h-36 rounded-xl border border-dashed border-orange-200 bg-cream overflow-hidden flex items-center justify-center shrink-0">
                {preview ? (
                  <img src={preview} alt="" className="w-full h-full object-cover" />
                ) : (
                  <i className="fa-regular fa-image text-3xl text-muted" />
                )}
              </div>
              <div>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-terracotta hover:bg-caramel text-white font-semibold cursor-pointer">
                  <i className="fa-solid fa-upload" />
                  Chọn ảnh
                  <input type="file" accept="image/*" className="sr-only" onChange={handleImage} />
                </label>
                {uploaded && (
                  <button type="button" onClick={() => setField("hinh_chinh", "")} className="block mt-2 text-sm font-semibold text-red-600">
                    Gỡ ảnh đã chọn
                  </button>
                )}
                <p className="text-xs text-gray-500 mt-2">JPG, PNG hoặc WEBP. Ảnh lưu tạm trong phiên làm việc.</p>
              </div>
            </div>
          </div>
        </FormCard>

        <FormCard title="Hiển thị">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold mb-3">Trạng thái</p>
              <div className="flex gap-6">
                <Choice name="trang_thai" value="hien" current={form.trang_thai} onChange={(value) => setField("trang_thai", value)} label="Hiện" />
                <Choice name="trang_thai" value="an" current={form.trang_thai} onChange={(value) => setField("trang_thai", value)} label="Ẩn" />
              </div>
            </div>
            <div>
              <p className="font-semibold mb-3">Nổi bật</p>
              <div className="flex gap-6">
                <Choice name="noi_bat" value={1} current={Number(form.noi_bat)} onChange={(value) => setField("noi_bat", value)} label="Có" />
                <Choice name="noi_bat" value={0} current={Number(form.noi_bat)} onChange={(value) => setField("noi_bat", value)} label="Không" />
              </div>
            </div>
          </div>
        </FormCard>

        <FormCard title="Mô tả và thông tin trà">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field label="Mô tả ngắn">
              <textarea className={`${fieldClass} min-h-24`} value={form.mo_ta_ngan || ""} onChange={(event) => setField("mo_ta_ngan", event.target.value)} />
            </Field>
            <Field label="Mô tả dài">
              <textarea className={`${fieldClass} min-h-24`} value={form.mo_ta_dai || ""} onChange={(event) => setField("mo_ta_dai", event.target.value)} />
            </Field>
            <Field label="Xuất xứ">
              <input className={fieldClass} value={form.xuat_xu || ""} onChange={(event) => setField("xuat_xu", event.target.value)} />
            </Field>
            <Field label="Loại trà">
              <input className={fieldClass} value={form.loai_tra || ""} onChange={(event) => setField("loai_tra", event.target.value)} />
            </Field>
            <Field label="Hương vị">
              <input className={fieldClass} value={form.huong_vi || ""} onChange={(event) => setField("huong_vi", event.target.value)} />
            </Field>
            <Field label="Nhiệt độ pha">
              <input className={fieldClass} value={form.nhiet_do_pha || ""} onChange={(event) => setField("nhiet_do_pha", event.target.value)} placeholder="75 - 85°C" />
            </Field>
          </div>
        </FormCard>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="px-5 py-3 rounded-lg bg-terracotta hover:bg-caramel text-white font-semibold">
            {existing ? "Lưu thay đổi" : "Thêm sản phẩm"}
          </button>
          <Link href="/danh-sach-san-pham" className="px-5 py-3 rounded-lg border border-orange-200 font-semibold hover:bg-cream">
            Quay lại
          </Link>
        </div>
      </form>
    </>
  );
}
