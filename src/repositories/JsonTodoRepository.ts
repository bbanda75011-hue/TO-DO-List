import fs from "fs/promises";
import path from "path";
import { Todo } from "../entities/Todo";
import { TodoRepository } from "./TodoRepository";

const DB_PATH = path.join(process.cwd(), "todos.json");

export class JsonTodoRepository implements TodoRepository {

  private async read(): Promise<Todo[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data) as Todo[];
    } catch {
      return []; 
    }
  }

  private async write(todos: Todo[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(todos, null, 2));
  }

  async findAll(): Promise<Todo[]> {
    return this.read();
  }

  async save(todo: Todo): Promise<void> {
    const todos = await this.read();
    todos.push(todo);
    await this.write(todos);
  }

  async update(id: string, data: Partial<Todo>): Promise<void> {
    const todos = await this.read();
    const index = todos.findIndex((t) => t.id === id);
    if (index === -1) throw new Error(`Todo ${id} introuvable`);
    todos[index] = { ...todos[index], ...data };
    await this.write(todos);
  }

  async delete(id: string): Promise<void> {
    const todos = await this.read();
    const filtered = todos.filter((t) => t.id !== id);
    await this.write(filtered);
  }
}