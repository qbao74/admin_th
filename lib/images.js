export const GALLERY = [
  "/images/sencha-leaves.jpg",
  "/images/genmaicha-leaves.jpg",
  "/images/gyokuro.jpg",
  "/images/hojicha.jpg",
  "/images/matcha-tin.jpg",
  "/images/hojicha-powder.jpg",
  "/images/sencha-pour.jpg",
  "/images/genmaicha-brew.jpg",
  "/images/matcha-latte.jpg",
  "/images/ceremony.jpg",
  "/images/kyusu.jpg",
  "/images/clay-pot.jpg",
  "/images/chawan.jpg",
  "/images/yunomi-cups.jpg",
  "/images/tetsubin.jpg",
  "/images/tea-set.jpg",
  "/images/kyoto-teapot.jpg",
  "/images/crackle-cup.jpg",
  "/images/matcha-bowl.jpg",
  "/images/matcha-scoop.jpg",
  "/images/gift-box.jpg",
  "/images/sakura-set.jpg",
  "/images/matcha-latte-cafe.jpg",
  "/images/banner-matcha.jpg",
];

export function galleryImage(id) {
  const index = Math.abs(Number(id) || 0) % GALLERY.length;
  return GALLERY[index];
}

export function productImage(product) {
  const src = product?.hinh_chinh;
  if (typeof src === "string" && (src.startsWith("data:") || src.startsWith("blob:"))) return src;
  return galleryImage(product?.id);
}
