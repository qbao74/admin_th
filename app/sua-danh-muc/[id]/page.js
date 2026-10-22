import CategoryForm from "@/components/categories/CategoryForm";

export const metadata = { title: "Sửa danh mục" };

export default async function Page({ params }) {
  const { id } = await params;
  return <CategoryForm categoryId={id} />;
}
