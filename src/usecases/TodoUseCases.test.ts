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
      const todo = await useCases.addTodo("Apprendre Jest", "moyenne");

      expect(todo.title).toBe("Apprendre Jest");
      expect(todo.status).toBe("en cours");
      expect(todo.priority).toBe("moyenne");
      expect(todo.id).toBeDefined();
    });

    it("rejette un titre vide", async () => {
      const { useCases } = makeUseCases();
      await expect(useCases.addTodo("   ", "faible")).rejects.toThrow(
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
      await useCases.addTodo("Todo 1", "faible");
      await useCases.addTodo("Todo 2", "moyenne");
      const todos = await useCases.listTodos();
      expect(todos).toHaveLength(2);
    });
  });

  describe("completeTodo", () => {
    it("marque un todo comme terminé", async () => {
      const { useCases } = makeUseCases();
      const todo = await useCases.addTodo("Finir le projet", "élevée");
      await useCases.completeTodo(todo.id);
      const todos = await useCases.listTodos();
      expect(todos[0].status).toBe("fait");
    });
  });

  describe("deleteTodo", () => {
    it("supprime un todo existant", async () => {
      const { useCases } = makeUseCases();
      const todo = await useCases.addTodo("À supprimer", "faible");
      await useCases.deleteTodo(todo.id);
      const todos = await useCases.listTodos();
      expect(todos).toHaveLength(0);
    });
  });
});