"use client";

import { createContext, useContext, useMemo, useState } from "react";
import seed from "@/lib/seed.json";
import { nextId } from "@/lib/format";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [products, setProducts] = useState(seed.san_pham);
  const [categories, setCategories] = useState(seed.danh_muc_san_pham);
  const [brands, setBrands] = useState(seed.thuong_hieu);
  const [users] = useState(seed.users);
  const [orders] = useState(seed.don_hang);
  const [orderItems] = useState(seed.chi_tiet_don_hang);
  const [posts, setPosts] = useState(seed.bai_viet);
  const [postCategories, setPostCategories] = useState(seed.danh_muc_bai_viet);

  const value = useMemo(() => {
    const categoryById = (id) => categories.find((item) => item.id === Number(id));
    const brandById = (id) => brands.find((item) => item.id === Number(id));
    const userById = (id) => users.find((item) => item.id === Number(id));
    const productById = (id) => products.find((item) => item.id === Number(id));
    const postCategoryById = (id) => postCategories.find((item) => item.id === Number(id));

    return {
      products,
      categories,
      brands,
      users,
      orders,
      orderItems,
      posts,
      postCategories,
      banners: seed.banner,
      vouchers: seed.phieu_giam_gia,
      categoryById,
      brandById,
      userById,
      productById,
      postCategoryById,
      addProduct(item) {
        const created = { ...item, id: nextId(products), so_lan_xem: item.so_lan_xem || 0 };
        setProducts((current) => [created, ...current]);
        return created;
      },
      updateProduct(id, item) {
        setProducts((current) =>
          current.map((product) => (product.id === Number(id) ? { ...product, ...item, id: product.id } : product)),
        );
      },
      removeProduct(id) {
        setProducts((current) => current.filter((product) => product.id !== Number(id)));
      },
      addCategory(item) {
        const created = { ...item, id: nextId(categories) };
        setCategories((current) => [...current, created].sort((a, b) => a.thu_tu_hien_thi - b.thu_tu_hien_thi));
        return created;
      },
      updateCategory(id, item) {
        setCategories((current) =>
          current
            .map((category) => (category.id === Number(id) ? { ...category, ...item, id: category.id } : category))
            .sort((a, b) => a.thu_tu_hien_thi - b.thu_tu_hien_thi),
        );
      },
      removeCategory(id) {
        setCategories((current) => current.filter((category) => category.id !== Number(id)));
      },
      addPost(item) {
        const created = { ...item, id: nextId(posts) };
        setPosts((current) => [created, ...current]);
        return created;
      },
      removePost(id) {
        setPosts((current) => current.filter((post) => post.id !== Number(id)));
      },
      addPostCategory(item) {
        const created = { ...item, id: nextId(postCategories) };
        setPostCategories((current) => [...current, created].sort((a, b) => a.thu_tu_hien_thi - b.thu_tu_hien_thi));
        return created;
      },
      updatePostCategory(id, item) {
        setPostCategories((current) =>
          current
            .map((category) => (category.id === Number(id) ? { ...category, ...item, id: category.id } : category))
            .sort((a, b) => a.thu_tu_hien_thi - b.thu_tu_hien_thi),
        );
      },
      removePostCategory(id) {
        setPostCategories((current) => current.filter((category) => category.id !== Number(id)));
      },
    };
  }, [products, categories, brands, users, orders, orderItems, posts, postCategories]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData phải nằm trong DataProvider");
  }
  return context;
}
