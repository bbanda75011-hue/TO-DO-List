# 📝 To-Do List — Node.js + TypeScript

> Projet d'apprentissage — prise en main de TypeScript et Clean Architecture.

A CLI to-do list built with Node.js and TypeScript, structured with Clean Architecture principles.

## Contexte

Ce projet est un exercice de prise en main de TypeScript et de la Clean Architecture.
L'objectif était de mettre en pratique :
- La structuration d'un projet Node.js en couches (entités, usecases, repositories)
- L'écriture de tests unitaires avec Jest
- L'utilisation de TypeScript en mode strict

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