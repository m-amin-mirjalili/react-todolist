import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "ember-todos:v1";
const MAX_TEXT_LENGTH = 200;
const MAX_TODOS = 500;

let nextSeedId = 1;
function makeTodo(text, completed = false) {
  return {
    id: crypto.randomUUID(),
    text,
    completed,
    createdAt: Date.now(),
  };
}

/** Reads and sanity-checks todos from localStorage; returns null when absent or corrupted. */
function loadTodos() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed
      .filter((t) => t && typeof t.text === "string" && t.text.trim())
      .slice(0, MAX_TODOS)
      .map((t) => ({
        id: typeof t.id === "string" && t.id ? t.id : `t${nextSeedId++}`,
        text: t.text.trim().slice(0, MAX_TEXT_LENGTH),
        completed: Boolean(t.completed),
        createdAt: typeof t.createdAt === "number" ? t.createdAt : Date.now(),
      }));
  } catch {
    return null;
  }
}

/** Friendly starter list on the very first visit. */
function seedTodos() {
  return [
    makeTodo("Welcome to Ember — this one is already done ✅", true),
    makeTodo("Double-click any todo to edit it in place", false),
    makeTodo("Add your first real task above 🔥", false),
  ];
}

export function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos() ?? seedTodos());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Storage may be unavailable (private mode / quota); the app still works in-session.
    }
  }, [todos]);

  const addTodo = useCallback((text) => {
    setTodos((prev) => [makeTodo(text.trim().slice(0, MAX_TEXT_LENGTH)), ...prev]);
  }, []);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  }, []);

  const editTodo = useCallback((id, text) => {
    const clean = text.trim().slice(0, MAX_TEXT_LENGTH);
    if (!clean) return;
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, text: clean } : t)));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const stats = useMemo(() => {
    const active = todos.filter((t) => !t.completed);
    return {
      total: todos.length,
      activeCount: active.length,
      completedCount: todos.length - active.length,
    };
  }, [todos]);

  return { todos, ...stats, addTodo, toggleTodo, editTodo, deleteTodo };
}
