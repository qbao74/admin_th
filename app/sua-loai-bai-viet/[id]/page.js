import PostTypeForm from "@/components/post-types/PostTypeForm";

export const metadata = { title: "Sửa loại bài viết" };

export default async function Page({ params }) {
  const { id } = await params;
  return <PostTypeForm categoryId={id} />;
}
