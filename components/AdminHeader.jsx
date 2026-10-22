"use client";

import Link from "next/link";

export default function AdminHeader({ onToggleSidebar }) {
  return (
    <header className="sticky top-0 z-50">
      <div className="h-8 bg-[#1e3323] text-[#d6e2d8] text-[13px]">
        <div className="px-4 md:px-6 h-full flex items-center justify-between">
          <p>Tea House • Hệ thống quản trị</p>
          <p className="hidden sm:block">
            Hotline: <strong className="text-white">1900 6868</strong>
          </p>
        </div>
      </div>
      <div className="bg-white border-b border-[#e8e4d8] shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
        <div className="px-4 md:px-6">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onToggleSidebar}
                className="lg:hidden w-10 h-10 rounded-full border border-[#e3e8df] text-forest hover:bg-cream"
                aria-label="Mở menu"
              >
                <i className="fa-solid fa-bars" />
              </button>

              <Link href="/" className="flex items-center gap-2.5">
                <span className="text-[32px] leading-none">🍵</span>
                <div>
                  <div className="text-[26px] font-extrabold tracking-tight text-[#1a3321] leading-none">
                    Tea <span className="text-leaf">House</span>
                  </div>
                  <div className="hidden sm:block text-xs text-muted mt-1">Hệ thống quản trị</div>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-right">
                <div className="text-xs text-muted">Xin chào</div>
                <div className="font-bold text-[#1a3321]">Administrator</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#f5f3ec] border border-[#e6e2d3] flex items-center justify-center text-forest">
                <i className="fa-regular fa-user" />
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-caramel"
              >
                <i className="fa-solid fa-right-from-bracket" />
                <span className="hidden sm:inline">Thoát</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
