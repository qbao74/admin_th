"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useData } from "@/components/DataProvider";
import PageHeading from "@/components/PageHeading";
import { Choice, Field, FormCard, fieldClass } from "@/components/FormBits";
import { toSlug } from "@/lib/format";

export default function PostForm() {
  const router = useRouter();
  const { postCategories, addPost } = useData();
  const [slugTouched, setSlugTouched] = useState(false);
  const [form, setForm] = useState({
    tieu_de: "",
    slug: "",
    id_danh_muc: postCategories[0]?.id || "",
    mo_ta_ngan: "",
    noi_dung: "",
    trang_thai: "hien",
    is_featured: 0,
  });
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!form.tieu_de.trim() || !form.slug.trim()) {
      setError("Nhập tiêu đề và slug.");
      return;
    }
    addPost({
      ...form,
      id_danh_muc: Number(form.id_danh_muc),
      is_featured: Number(form.is_featured),
      hinh: "/images/sencha-leaves.jpg",
    });
    router.push("/danh-sach-bai-viet");
  }

  return (
    <>
      <PageHeading kicker="Quản lý bài viết" title="Thêm bài viết" description="Bài mới xuất hiện ngay trong danh sách của phiên này." />
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <FormCard title="Nội dung bài viết">
          <div className="grid gap-5">
            <Field label="Tiêu đề" required>
              <input
                className={fieldClass}
                value={form.tieu_de}
                onChange={(event) => {
                  const tieu_de = event.target.value;
                  setForm((current) => ({ ...current, tieu_de, slug: slugTouched ? current.slug : toSlug(tieu_de) }));
                }}
              />
            </Field>
            <Field label="Slug" required>
              <input
                className={fieldClass}
                value={form.slug}
                onChange={(event) => {
                  setSlugTouched(true);
                  setForm((current) => ({ ...current, slug: event.target.value }));
                }}
              />
            </Field>
            <Field label="Loại bài viết">
              <select className={fieldClass} value={form.id_danh_muc} onChange={(event) => setForm((current) => ({ ...current, id_danh_muc: event.target.value }))}>
                {postCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.ten}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Mô tả ngắn">
              <textarea className={`${fieldClass} min-h-24`} value={form.mo_ta_ngan} onChange={(event) => setForm((current) => ({ ...current, mo_ta_ngan: event.target.value }))} />
            </Field>
            <Field label="Nội dung">
              <textarea className={`${fieldClass} min-h-36`} value={form.noi_dung} onChange={(event) => setForm((current) => ({ ...current, noi_dung: event.target.value }))} />
            </Field>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <p className="font-semibold mb-3">Trạng thái</p>
                <div className="flex gap-6">
                  <Choice name="trang_thai" value="hien" current={form.trang_thai} onChange={(value) => setForm((current) => ({ ...current, trang_thai: value }))} label="Hiện" />
                  <Choice name="trang_thai" value="an" current={form.trang_thai} onChange={(value) => setForm((current) => ({ ...current, trang_thai: value }))} label="Ẩn" />
                </div>
              </div>
              <div>
                <p className="font-semibold mb-3">Nổi bật</p>
                <div className="flex gap-6">
                  <Choice name="is_featured" value={1} current={Number(form.is_featured)} onChange={(value) => setForm((current) => ({ ...current, is_featured: value }))} label="Có" />
                  <Choice name="is_featured" value={0} current={Number(form.is_featured)} onChange={(value) => setForm((current) => ({ ...current, is_featured: value }))} label="Không" />
                </div>
              </div>
            </div>
          </div>
        </FormCard>
        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
        <div className="flex gap-3 mt-6">
          <button type="submit" className="px-5 py-3 rounded-lg bg-terracotta hover:bg-caramel text-white font-semibold">
            Thêm bài viết
          </button>
          <Link href="/danh-sach-bai-viet" className="px-5 py-3 rounded-lg border border-orange-200 font-semibold hover:bg-cream">
            Quay lại
          </Link>
        </div>
      </form>
    </>
  );
}
