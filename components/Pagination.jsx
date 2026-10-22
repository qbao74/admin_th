"use client";

export default function Pagination({ page, pageCount, onChange }) {
  if (pageCount <= 1) return null;

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="w-10 h-10 rounded-full border border-orange-200 bg-white text-terracotta disabled:opacity-40"
      >
        <i className="fa-solid fa-chevron-left" />
      </button>
      {pages.map((number) => (
        <button
          key={number}
          type="button"
          onClick={() => onChange(number)}
          className={`w-10 h-10 rounded-full border font-semibold ${
            number === page
              ? "bg-terracotta border-terracotta text-white"
              : "bg-white border-orange-200 text-brown hover:bg-cream"
          }`}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        onClick={() => onChange(Math.min(pageCount, page + 1))}
        disabled={page === pageCount}
        className="w-10 h-10 rounded-full border border-orange-200 bg-white text-terracotta disabled:opacity-40"
      >
        <i className="fa-solid fa-chevron-right" />
      </button>
    </div>
  );
}
