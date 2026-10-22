export const fieldClass =
  "w-full border border-orange-200 rounded-lg px-4 py-3 bg-white outline-none focus:border-terracotta";

export function Field({ label, required, hint, children }) {
  return (
    <div>
      <label className="block font-semibold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-500 mt-2">{hint}</p>}
    </div>
  );
}

export function FormCard({ title, description, children }) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-orange-100 p-5 md:p-6">
      <div className="mb-5">
        <h2 className="font-bold text-lg">{title}</h2>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      {children}
    </section>
  );
}

export function Choice({ name, value, current, onChange, label }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={current === value}
        onChange={() => onChange(value)}
        className="accent-terracotta"
      />
      <span>{label}</span>
    </label>
  );
}
