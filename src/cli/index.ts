import { select, input, checkbox } from "@inquirer/prompts";
import { JsonTodoRepository } from "../repositories/JsonTodoRepository";
import { TodoUseCases } from "../usecases/TodoUseCases";
import { Priority, Todo } from "../entities/Todo";

const repo = new JsonTodoRepository();
const useCases = new TodoUseCases(repo);

function formatTodo(todo: Todo): string {
  const icon = todo.status === "fait" ? "✅" : "⬜";
  const title =
    todo.status === "fait" ? `\x1b[9m${todo.title}\x1b[0m` : todo.title;
  return `${icon} ${title}`;
}

async function mainMenu(): Promise<void> {
  console.clear();
  console.log("\x1b[1m\x1b[36m📝  TO-DO LIST\x1b[0m\n");

  const todos = await useCases.listTodos();
  if (todos.length > 0) {
    todos.forEach((t) => console.log("  " + formatTodo(t)));
    console.log();
  } else {
    console.log("  \x1b[2mAucune tâche pour l'instant.\x1b[0m\n");
  }

  // Menu principal
  const action = await select({
    message: "Que veux-tu faire ?",
    choices: [
      { name: "➕  Ajouter une tâche", value: "add" },
      { name: "✅  Marquer comme terminée", value: "complete" },
      { name: "🗑️   Supprimer une tâche", value: "delete" },
      { name: "🚪  Quitter", value: "quit" },
    ],
  });

  switch (action) {
    case "add": {
      const title = await input({ message: "Titre de la tâche :" });
      const priority = await select({
        message: "Priorité :",
        choices: [
            { name: "🟢 Faible", value: "faible" },
            { name: "🟡 Moyenne", value: "moyenne" },
            { name: "🔴 Élevée", value: "élevée" },
        ],
      });
      await useCases.addTodo(title, priority as Priority);
      break;
    }

    case "complete": {
      const pending = todos.filter((t) => t.status === "en cours");
      if (!pending.length) {
        console.log("\n  Aucune tâche en attente.");
        await new Promise((r) => setTimeout(r, 1200));
        break;
      }
      const id = await select({
        message: "Quelle tâche marquer comme terminée ?",
        choices: pending.map((t) => ({ name: t.title, value: t.id })),
      });
      await useCases.completeTodo(id);
      break;
    }

    case "delete": {
      if (!todos.length) break;
      const ids = await checkbox({
        message: "Sélectionne les tâches à supprimer :",
        choices: todos.map((t) => ({
          name: formatTodo(t),
          value: t.id,
        })),
      });
      for (const id of ids) await useCases.deleteTodo(id);
      break;
    }

    case "quit":
      console.log("\n  À bientôt ! 👋\n");
      process.exit(0);
  }

  // Rappel récursif = boucle de menu
  return mainMenu();
}

mainMenu().catch((err) => {
  console.error("\nErreur :", err.message);
  process.exit(1);
});