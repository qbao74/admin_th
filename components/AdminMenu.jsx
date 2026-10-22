"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const GROUPS = [
  {
    id: "menuProduct",
    label: "Quản lý sản phẩm",
    icon: "fa-solid fa-box-open",
    items: [
      { href: "/them-san-pham", label: "Thêm sản phẩm" },
      { href: "/danh-sach-san-pham", label: "Danh sách sản phẩm" },
    ],
  },
  {
    id: "menuCategory",
    label: "Quản lý danh mục",
    icon: "fa-solid fa-layer-group",
    items: [
      { href: "/them-danh-muc", label: "Thêm danh mục" },
      { href: "/danh-sach-danh-muc", label: "Danh sách danh mục" },
    ],
  },
  {
    id: "menuBrand",
    label: "Quản lý thương hiệu",
    icon: "fa-solid fa-certificate",
    items: [{ href: "/danh-sach-thuong-hieu", label: "Danh sách thương hiệu" }],
  },
  {
    id: "menuUsers",
    label: "Quản lý users",
    icon: "fa-solid fa-users",
    items: [{ href: "/danh-sach-users", label: "Danh sách users" }],
  },
  {
    id: "menuOrder",
    label: "Quản lý đơn hàng",
    icon: "fa-solid fa-cart-shopping",
    items: [{ href: "/danh-sach-don-hang", label: "Danh sách đơn hàng" }],
  },
  {
    id: "menuPostType",
    label: "Quản lý loại bài viết",
    icon: "fa-solid fa-folder-open",
    items: [
      { href: "/them-loai-bai-viet", label: "Thêm loại bài viết" },
      { href: "/danh-sach-loai-bai-viet", label: "Danh sách loại bài" },
    ],
  },
  {
    id: "menuPost",
    label: "Quản lý bài viết",
    icon: "fa-regular fa-newspaper",
    items: [
      { href: "/them-bai-viet", label: "Thêm bài viết" },
      { href: "/danh-sach-bai-viet", label: "Danh sách bài viết" },
    ],
  },
];

function isActive(pathname, href) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function groupMatches(pathname, group) {
  if (group.items.some((item) => isActive(pathname, item.href))) return true;
  if (group.id === "menuProduct" && pathname.startsWith("/sua-san-pham")) return true;
  if (group.id === "menuCategory" && pathname.startsWith("/sua-danh-muc")) return true;
  if (group.id === "menuPostType" && pathname.startsWith("/sua-loai-bai-viet")) return true;
  return false;
}

export default function AdminMenu({ open, onClose }) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState(() =>
    Object.fromEntries(GROUPS.map((group) => [group.id, groupMatches(pathname, group)])),
  );

  useEffect(() => {
    setOpenGroups((current) => {
      const next = { ...current };
      GROUPS.forEach((group) => {
        if (groupMatches(pathname, group)) next[group.id] = true;
      });
      return next;
    });
  }, [pathname]);

  return (
    <>
      <aside
        className={`fixed lg:sticky top-24 left-0 z-40 w-72 h-[calc(100vh-96px)] bg-forest text-white overflow-y-auto shrink-0 self-start transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-4">
          <div className="px-3 pt-2 pb-4">
            <p className="text-xs uppercase tracking-wider text-white/60">Quản trị hệ thống</p>
          </div>

          <Link
            href="/"
            onClick={onClose}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition ${
              pathname === "/" ? "bg-white/15 text-white" : "hover:bg-white/10 text-white"
            }`}
          >
            <i className="fa-solid fa-gauge-high w-5" />
            <span className="font-medium">Trang chủ admin</span>
          </Link>

          {GROUPS.map((group) => {
            const expanded = openGroups[group.id];
            return (
              <div key={group.id} className="mb-2">
                <button
                  type="button"
                  onClick={() => setOpenGroups((current) => ({ ...current, [group.id]: !current[group.id] }))}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/10 transition"
                >
                  <span className="flex items-center gap-3">
                    <i className={`${group.icon} w-5`} />
                    <span>{group.label}</span>
                  </span>
                  <i className={`fa-solid fa-chevron-down text-xs transition-transform ${expanded ? "rotate-180" : ""}`} />
                </button>
                {expanded && (
                  <div className="ml-8 mt-1 space-y-1">
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={`block px-4 py-2.5 text-sm rounded-lg hover:bg-white/10 hover:text-white ${
                          isActive(pathname, item.href) ? "bg-white/15 text-white" : "text-white/80"
                        }`}
                      >
                        <i className={`fa-solid ${item.label.startsWith("Thêm") ? "fa-plus" : "fa-list"} mr-2`} />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>

      <button
        type="button"
        aria-label="Đóng menu"
        onClick={onClose}
        className={`fixed inset-0 top-24 bg-black/30 z-30 lg:hidden ${open ? "" : "hidden"}`}
      />
    </>
  );
}
