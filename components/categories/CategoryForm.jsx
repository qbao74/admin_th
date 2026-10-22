"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useData } from "@/components/DataProvider";
import PageHeading from "@/components/PageHeading";
import { Choice, Field, FormCard, fieldClass } from "@/components/FormBits";
import { toSlug } from "@/lib/format";

export default function CategoryForm({ categoryId }) {
  const router = useRouter();
  const { categories, addCategory, updateCategory } = useData();
  const existing = categoryId ? categories.find((item) => item.id === Number(categoryId)) : null;
  const [slugTouched, setSlugTouched] = useState(Boolean(existing));
  const [form, setForm] = useState(() =>
    existing
      ? { ten: existing.ten, slug: existing.slug, thu_tu_hien_thi: existing.thu_tu_hien_thi, trang_thai: Number(existing.trang_thai) }
      : { ten: "", slug: "", thu_tu_hien_thi: categories.length + 1, trang_thai: 1 },
  );
  const [error, setError] = useState("");

  if (categoryId && !existing) return <p className="text-gray-500">Không tìm thấy danh mục.</p>;

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.ten.trim() || !form.slug.trim()) {
      setError("Nhập tên và slug của danh mục.");
      return;
    }
    const payload = {
      ten: form.ten.trim(),
      slug: form.slug.trim(),
      thu_tu_hien_thi: Number(form.thu_tu_hien_thi) || 1,
      trang_thai: Number(form.trang_thai),
      image_url: existing?.image_url || "/images/sencha-leaves.jpg",
    };
    if (existing) updateCategory(existing.id, payload);
    else addCategory(payload);
    router.push("/danh-sach-danh-muc");
  }

  return (
    <>
      <PageHeading
        kicker="Quản lý danh mục"
        title={existing ? "Sửa danh mục" : "Thêm danh mục"}
        description="Tạo hoặc cập nhật danh mục sản phẩm trên giao diện."
      />
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <FormCard title="Thông tin danh mục">
          <div className="grid gap-5">
            <Field label="Tên danh mục" required hint="Ví dụ: Trà, Dụng cụ pha trà.">
              <input
                className={fieldClass}
                value={form.ten}
                placeholder="Ví dụ: Trà túi lọc"
                onChange={(event) => {
                  const ten = event.target.value;
                  setForm((current) => ({ ...current, ten, slug: slugTouched ? current.slug : toSlug(ten) }));
                }}
              />
            </Field>
            <Field label="Slug" required>
              <input
                className={fieldClass}
                value={form.slug}
                placeholder="tra-tui-loc"
                onChange={(event) => {
                  setSlugTouched(true);
                  setForm((current) => ({ ...current, slug: event.target.value }));
                }}
              />
            </Field>
            <Field label="Thứ tự hiển thị">
              <input
                className={fieldClass}
                type="number"
                min="1"
                value={form.thu_tu_hien_thi}
                onChange={(event) => setForm((current) => ({ ...current, thu_tu_hien_thi: event.target.value }))}
              />
            </Field>
            <div>
              <p className="font-semibold mb-3">Trạng thái</p>
              <div className="flex gap-6">
                <Choice name="trang_thai" value={1} current={Number(form.trang_thai)} onChange={(value) => setForm((current) => ({ ...current, trang_thai: value }))} label="Hiện" />
                <Choice name="trang_thai" value={0} current={Number(form.trang_thai)} onChange={(value) => setForm((current) => ({ ...current, trang_thai: value }))} label="Ẩn" />
              </div>
            </div>
          </div>
        </FormCard>
        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
        <div className="flex gap-3 mt-6">
          <button type="submit" className="px-5 py-3 rounded-lg bg-terracotta hover:bg-caramel text-white font-semibold">
            {existing ? "Lưu thay đổi" : "Thêm danh mục"}
          </button>
          <Link href="/danh-sach-danh-muc" className="px-5 py-3 rounded-lg border border-orange-200 font-semibold hover:bg-cream">
            Quay lại
          </Link>
        </div>
      </form>
    </>
  );
}
