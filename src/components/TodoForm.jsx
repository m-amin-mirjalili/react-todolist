import { useState, useRef } from "react";
import { FlameIcon, PlusIcon } from "./Icons.jsx";

export default function TodoForm({ onSubmit }) {
  const [value, setValue] = useState("");
  // Bumped on every invalid submit; used as a React key so the
  // shake animation remounts and replays each time.
  const [shakeId, setShakeId] = useState(0);
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setShakeId((n) => n + 1);
      inputRef.current?.focus();
      return;
    }
    onSubmit(trimmed);
    setValue("");
    inputRef.current?.focus();
  };

  const invalid = shakeId > 0 && !value.trim();

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="flex items-center gap-3">
        <div
          key={shakeId}
          className={`glass-inset relative flex-1 rounded-2xl transition-colors duration-300 focus-within:border-flame-400/60 focus-within:shadow-glow-soft ${
            invalid ? "animate-shake border-flame-600/80 bg-flame-700/10" : ""
          }`}
        >
          <FlameIcon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-flame-400/80"
          />
          <input
            ref={inputRef}
            type="text"
            maxLength={200}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (shakeId > 0) setShakeId(0);
            }}
            placeholder="What needs to get done?"
            aria-label="New todo"
            aria-invalid={invalid}
            className="w-full bg-transparent py-3.5 pr-4 pl-11 text-base text-white outline-none placeholder:text-white/30"
          />
        </div>
        <button
          type="submit"
          aria-label="Add todo"
          className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-r from-flame-600 via-flame-500 to-flame-400 shadow-glow transition duration-200 hover:shadow-glow-hover hover:brightness-110 active:scale-90"
        >
          <PlusIcon aria-hidden="true" className="size-5 text-white" />
        </button>
      </form>
      {invalid && (
        <p role="alert" className="mt-2 pl-1 text-xs font-medium text-flame-200">
          A todo can&apos;t be empty — type something first.
        </p>
      )}
    </div>
  );
}
