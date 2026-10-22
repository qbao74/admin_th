import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider } from "@/components/DataProvider";
import AdminShell from "@/components/AdminShell";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: {
    default: "Tea House Admin",
    template: "%s | Tea House Admin",
  },
  description: "Giao diện quản trị Tea House",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} bg-lightcream text-brown`}>
        <DataProvider>
          <AdminShell>{children}</AdminShell>
        </DataProvider>
      </body>
    </html>
  );
}
