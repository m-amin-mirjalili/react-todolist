const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Done" },
];

export default function FilterBar({ value, onChange, counts }) {
  return (
    <div
      role="tablist"
      aria-label="Filter todos"
      className="glass-inset mt-5 flex gap-1 rounded-2xl p-1"
    >
      {FILTERS.map((filter) => {
        const isActive = value === filter.id;
        return (
          <button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(filter.id)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-gradient-to-r from-flame-600 via-flame-500 to-flame-400 shadow-glow text-white"
                : "text-white/55 hover:bg-white/5 hover:text-white"
            }`}
          >
            {filter.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[11px] leading-4 tabular-nums ${
                isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/50"
              }`}
            >
              {counts[filter.id]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
