import { TodoUseCases } from "./TodoUseCases";
import { InMemoryTodoRepository } from "../repositories/InMemoryTodoRepository";

// Fonction utilitaire : crée un use case avec repo vide
function makeUseCases() {
  const repo = new InMemoryTodoRepository();
  const useCases = new TodoUseCases(repo);
  return { repo, useCases };
}

describe("TodoUseCases", () => {

  describe("addTodo", () => {
    it("crée un todo avec le bon titre", async () => {
      const { useCases } = makeUseCases();
      const todo = await useCases.addTodo("Apprendre Jest");

      expect(todo.title).toBe("Apprendre Jest");
      expect(todo.status).toBe("en cours");
      expect(todo.id).toBeDefined();
    });

    it("rejette un titre vide", async () => {
      const { useCases } = makeUseCases();
      await expect(useCases.addTodo("   ")).rejects.toThrow(
        "Le titre ne peut pas être vide"
      );
    });
  });

  describe("listTodos", () => {
    it("retourne une liste vide au départ", async () => {
      const { useCases } = makeUseCases();
      const todos = await useCases.listTodos();
      expect(todos).toHaveLength(0);
    });

    it("retourne tous les todos ajoutés", async () => {
      const { useCases } = makeUseCases();
      await useCases.addTodo("Todo 1");
      await useCases.addTodo("Todo 2");
      const todos = await useCases.listTodos();
      expect(todos).toHaveLength(2);
    });
  });

  describe("completeTodo", () => {
    it("marque un todo comme terminé", async () => {
      const { useCases } = makeUseCases();
      const todo = await useCases.addTodo("Finir le projet");
      await useCases.completeTodo(todo.id);
      const todos = await useCases.listTodos();
      expect(todos[0].status).toBe("fait");
    });
  });

  describe("deleteTodo", () => {
    it("supprime un todo existant", async () => {
      const { useCases } = makeUseCases();
      const todo = await useCases.addTodo("À supprimer");
      await useCases.deleteTodo(todo.id);
      const todos = await useCases.listTodos();
      expect(todos).toHaveLength(0);
    });
  });
});