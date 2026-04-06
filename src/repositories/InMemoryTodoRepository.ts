import { Todo } from "../entities/Todo";
import { TodoRepository } from "./TodoRepository";

export class InMemoryTodoRepository implements TodoRepository {
  private todos: Todo[] = [];

  async findAll(): Promise<Todo[]> {
    return this.todos;
  }

  async save(todo: Todo): Promise<void> {
    this.todos.push(todo);
  }

  async update(id: string, data: Partial<Todo>): Promise<void> {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`Todo ${id} introuvable`);
    this.todos[index] = { ...this.todos[index], ...data };
  }

  async delete(id: string): Promise<void> {
    this.todos = this.todos.filter((t) => t.id !== id);
  }
}