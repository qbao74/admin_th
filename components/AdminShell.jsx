"use client";

import { useState } from "react";
import AdminHeader from "@/components/AdminHeader";
import AdminMenu from "@/components/AdminMenu";

export default function AdminShell({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdminHeader onToggleSidebar={() => setOpen((value) => !value)} />
      <div className="flex min-h-[calc(100vh-96px)]">
        <AdminMenu open={open} onClose={() => setOpen(false)} />
        <main className="flex-1 min-w-0 p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </>
  );
}
