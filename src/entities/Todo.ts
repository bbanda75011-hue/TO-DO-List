export type TodoStatus = 'en cours' | 'fait';
export type Priority = 'faible' | 'moyenne' | 'élevée';
export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt: string;
  priority: Priority;
}

export function createTodo(title: string, priority: Priority): Todo {
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    status: 'en cours',
    createdAt: new Date().toISOString(),
    priority,
  };
}