import { useEffect, useRef, useState } from "react";
import { CheckIcon, PencilIcon, TrashIcon, XIcon } from "./Icons.jsx";

export default function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const [exiting, setExiting] = useState(false);
  const [shakeId, setShakeId] = useState(0);
  const editInputRef = useRef(null);
  const deleteTimerRef = useRef(null);

  useEffect(() => {
    if (!isEditing) return;
    const el = editInputRef.current;
    if (el) {
      el.focus();
      el.select();
    }
  }, [isEditing]);

  useEffect(() => () => clearTimeout(deleteTimerRef.current), []);

  const startEdit = () => {
    setDraft(todo.text);
    setShakeId(0);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraft(todo.text);
    setShakeId(0);
  };

  const commitEdit = () => {
    const trimmed = draft.trim();
    if (!trimmed) {
      setShakeId((n) => n + 1);
      editInputRef.current?.focus();
      return;
    }
    if (trimmed !== todo.text) onEdit(todo.id, trimmed);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setExiting(true);
    // Remove from state once the burnout animation completes.
    deleteTimerRef.current = setTimeout(() => onDelete(todo.id), 320);
  };

  const handleAnimationEnd = (event) => {
    if (exiting && event.animationName === "burnout") onDelete(todo.id);
  };

  const baseInputClasses =
    "min-w-0 flex-1 rounded-xl border bg-black/20 px-2.5 py-1.5 text-[15px] text-white outline-none transition-colors focus:border-flame-400/70";

  return (
    <li
      onAnimationEnd={handleAnimationEnd}
      onDoubleClick={isEditing ? undefined : startEdit}
      className={`glass-card group relative flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300 hover:border-flame-400/30 md:px-5 ${
        exiting
          ? "animate-burnout pointer-events-none"
          : "animate-add hover:bg-white/[0.07]"
      } ${todo.completed ? "opacity-60" : "opacity-100"}`}
    >
      {/* Complete / incomplete toggle */}
      <button
        type="button"
        onClick={() => onToggle(todo.id)}
        aria-pressed={todo.completed}
        aria-label={todo.completed ? "Mark as not done" : "Mark as done"}
        className={`grid size-7 shrink-0 place-items-center rounded-full border transition-all duration-300 active:scale-90 ${
          todo.completed
            ? "border-transparent bg-gradient-to-br from-flame-600 to-flame-400 shadow-glow"
            : "border-white/25 hover:border-flame-400/80 hover:shadow-glow-soft"
        }`}
      >
        {todo.completed && <CheckIcon className="size-4 text-white" />}
      </button>

      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            commitEdit();
          }}
          noValidate
          className="flex min-w-0 flex-1 items-center gap-2"
        >
          <div
            key={shakeId}
            className={`flex min-w-0 flex-1 items-center ${
              shakeId > 0 ? "animate-shake" : ""
            }`}
          >
            <input
              ref={editInputRef}
              type="text"
              maxLength={200}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                if (shakeId > 0) setShakeId(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") cancelEdit();
              }}
              aria-label="Edit todo"
              className={`${baseInputClasses} ${
                shakeId > 0
                  ? "animate-shake border-flame-600/80 bg-flame-700/10"
                  : "border-flame-400/40 focus:bg-black/30"
              }`}
            />
            {shakeId > 0 && (
              <span className="ml-2 hidden shrink-0 text-[11px] font-medium whitespace-nowrap text-flame-200 sm:inline">
                Can&apos;t be empty
              </span>
            )}
          </div>
          <button
            type="submit"
            aria-label="Save changes"
            className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-flame-600 to-flame-400 text-white shadow-glow-soft transition hover:brightness-110 active:scale-90"
          >
            <CheckIcon className="size-4" />
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            aria-label="Cancel editing"
            className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/15 text-white/60 transition hover:border-white/30 hover:text-white active:scale-90"
          >
            <XIcon className="size-4" />
          </button>
        </form>
      ) : (
        <span
          className={`min-w-0 flex-1 cursor-default text-[15px] transition-all duration-300 ${
            todo.completed
              ? "text-white/40 line-through decoration-flame-500/70 decoration-2"
              : "text-white/90"
          }`}
          title="Double-click to edit"
        >
          {todo.text}
        </span>
      )}

      {!isEditing && (
        <div className="ml-1 flex shrink-0 items-center gap-1 opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 max-md:opacity-60">
          {!todo.completed && (
            <button
              type="button"
              onClick={startEdit}
              aria-label="Edit todo"
              className="grid size-8 place-items-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-flame-300 active:scale-90"
            >
              <PencilIcon className="size-4" />
            </button>
          )}
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Delete todo"
            className="grid size-8 place-items-center rounded-lg text-white/50 transition hover:bg-flame-700/30 hover:text-flame-200 active:scale-90"
          >
            <TrashIcon className="size-4" />
          </button>
        </div>
      )}
    </li>
  );
}
