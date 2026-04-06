import { Todo } from "../entities/Todo";

export interface TodoRepository {
  findAll(): Promise<Todo[]>;
  save(todo: Todo): Promise<void>;
  update(id: string, data: Partial<Todo>): Promise<void>;
  delete(id: string): Promise<void>;
}