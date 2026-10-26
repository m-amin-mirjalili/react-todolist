import { FlameIcon } from "./Icons.jsx";
import TodoItem from "./TodoItem.jsx";

const EMPTY_STATE = {
  all: {
    title: "Nothing here yet",
    hint: "Add your first task above and keep the fire going 🔥",
  },
  active: {
    title: "All caught up!",
    hint: "No active tasks — the fire's burned down to embers. Nice.",
  },
  completed: {
    title: "Nothing completed yet",
    hint: "Check off a task and it will land here.",
  },
};

export default function TodoList({ todos, filter, onToggle, onEdit, onDelete }) {
  if (todos.length === 0) {
    const empty = EMPTY_STATE[filter];
    return (
      <ul className="mt-4">
        <li className="glass-inset flex flex-col items-center rounded-2xl px-4 py-10 text-center">
          <FlameIcon className="size-8 animate-breathe text-flame-500/70" />
          <p className="mt-3 text-sm font-semibold text-white/80">{empty.title}</p>
          <p className="mt-1 text-xs text-white/40">{empty.hint}</p>
        </li>
      </ul>
    );
  }

  return (
    <ul className="mt-4 flex flex-col gap-2.5">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
