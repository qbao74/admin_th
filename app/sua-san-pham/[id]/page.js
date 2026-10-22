import ProductForm from "@/components/products/ProductForm";

export const metadata = { title: "Sửa sản phẩm" };

export default async function Page({ params }) {
  const { id } = await params;
  return <ProductForm productId={id} />;
}
