import { createTodo, Todo } from "../entities/Todo";
import { TodoRepository } from "../repositories/TodoRepository";

export class TodoUseCases {
  constructor(private readonly repo: TodoRepository) {}

  async addTodo(title: string): Promise<Todo> {
    if (!title.trim()) throw new Error("Le titre ne peut pas être vide");
    const todo = createTodo(title);
    await this.repo.save(todo);
    return todo;
  }

  async listTodos(): Promise<Todo[]> {
    return this.repo.findAll();
  }

  async completeTodo(id: string): Promise<void> {
    await this.repo.update(id, { status: "fait" });
  }

  async deleteTodo(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}