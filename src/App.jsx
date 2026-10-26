import { useMemo, useState } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoForm from "./components/TodoForm";
import FilterBar from "./components/FilterBar";
import TodoList from "./components/TodoList";
import BackgroundGlows from "./components/BackgroundGlows";
import { FlameIcon } from "./components/Icons";

export default function App() {
  const {
    todos,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
  } = useTodos();

  const [filter, setFilter] = useState("all");

  const visibleTodos = useMemo(() => {
    if (filter === "active") return todos.filter((t) => !t.completed);
    if (filter === "completed") return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-start px-4 py-12 sm:py-16">
      <BackgroundGlows />

      <main className="relative z-10 w-full max-w-xl">
        <header className="mb-7 text-center">
          <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-flame-600 via-flame-500 to-flame-400 shadow-glow">
            <FlameIcon className="size-8 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-fire sm:text-5xl">
            Ember
          </h1>
          <p className="mt-2 text-sm font-medium text-white/45">
            Stay lit. Get it done.
          </p>
        </header>

        <section className="glass-panel rounded-3xl p-5 sm:p-6">
          <TodoForm onSubmit={addTodo} />

          <FilterBar
            value={filter}
            onChange={setFilter}
            counts={{ all: todos.length, active: activeCount, completed: completedCount }}
          />

          <TodoList
            todos={visibleTodos}
            filter={filter}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
          />

          <footer className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-medium text-white/50">
            <span className="flex items-center gap-1.5" aria-live="polite">
              <FlameIcon className="size-3.5 text-flame-400" />
              {activeCount} {activeCount === 1 ? "task" : "tasks"} remaining
            </span>
            <span className="tabular-nums">
              {completedCount} of {todos.length} done
            </span>
          </footer>
        </section>

        <p className="mt-4 text-center text-[11px] text-white/30">
          Saved automatically in your browser — double-click a todo to edit it.
        </p>
      </main>
    </div>
  );
}
