import Link from "next/link";

export default function PageHeading({ kicker, title, description, actionHref, actionLabel }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <p className="text-[13px] uppercase tracking-[2px] text-honey font-bold">{kicker}</p>
        <h1 className="text-2xl md:text-3xl font-bold mt-1 text-forest">{title}</h1>
        {description && <p className="text-sm text-gray-500 mt-2">{description}</p>}
      </div>
      {actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-terracotta hover:bg-caramel text-white rounded-[10px] font-bold"
        >
          <i className="fa-solid fa-plus" />
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
