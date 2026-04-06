# 📝 To-Do List — Node.js + TypeScript

A CLI to-do list built with Node.js and TypeScript, structured with Clean Architecture principles.

## Tech Stack

- **TypeScript** — strict mode
- **Node.js** — fs/promises, crypto
- **@inquirer/prompts** — interactive CLI
- **Jest + ts-jest** — unit testing

## Architecture
```bash
src/    
├── entities/           # Domain (Todo, Priority, Status)   
├── repositories/       # Data access (JSON file + in-memory mock)  
├── usecases/           # Business logic + tests    
└── cli/                # Presentation layer
```
## Getting Started
```bash
npm install
npm run dev     # Start the app
npm test        # Run tests
npm run build   # Compile to JavaScript
```

## Features

- ➕ Add a task with a priority (low / medium / high)
- ✅ Mark a task as done
- 🗑️ Delete one or multiple tasks
- 💾 Persistent storage via JSON file