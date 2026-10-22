"use client";

import { useData } from "@/components/DataProvider";
import PageHeading from "@/components/PageHeading";
import { galleryImage } from "@/lib/images";

export default function BrandList() {
  const { brands, products } = useData();

  return (
    <>
      <PageHeading
        kicker="Quản lý thương hiệu"
        title="Danh sách thương hiệu"
        description="Thương hiệu gắn với sản phẩm trong dữ liệu Tea House."
      />
      <section>
        <div className="hidden xl:grid grid-cols-[88px_1.4fr_2fr_120px_140px] gap-5 px-5 py-3 bg-cream border border-orange-100 rounded-t-xl text-sm font-semibold">
          <div>Logo</div>
          <div>Thương hiệu</div>
          <div>Mô tả</div>
          <div>Thứ tự</div>
          <div>Trạng thái</div>
        </div>
        <div className="space-y-4 xl:space-y-0">
          {brands.map((brand, index) => {
            const count = products.filter((product) => product.id_thuong_hieu === brand.id).length;
            const visible = Number(brand.trang_thai) === 1;
            const isLast = index === brands.length - 1;
            return (
              <article
                key={brand.id}
                className={`bg-white border border-orange-100 p-4 xl:p-5 ${
                  isLast ? "rounded-xl xl:rounded-none xl:rounded-b-xl xl:border-t-0" : "rounded-xl xl:rounded-none xl:border-t-0"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[88px_1.4fr_2fr_120px_140px] gap-5 items-center">
                  <img src={galleryImage(brand.id + 8)} alt="" className="w-16 h-16 object-cover rounded-xl" />
                  <div>
                    <h2 className="font-bold text-lg">{brand.ten}</h2>
                    <p className="text-sm text-gray-500 mt-1">{count} sản phẩm</p>
                  </div>
                  <p className="text-sm text-gray-600">{brand.mo_ta}</p>
                  <div className="font-semibold">{brand.thu_tu_hien_thi}</div>
                  <span className={`inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold ${visible ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                    {visible ? "Đang hiện" : "Đang ẩn"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
