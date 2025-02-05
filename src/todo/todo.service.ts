import { Injectable } from '@nestjs/common';

@Injectable()
export class TodoService {
  private todos: { id: number; title: string; completed: boolean }[] = [];
  private idCounter = 1;

  createTodo(title: string) {
    const newTodo = {
      id: this.idCounter++,
      title,
      completed: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  getTodos() {
    return this.todos;
  }

  getTodoById(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  updateTodo(id: number, title?: string, completed?: boolean) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return null;
    }
    if (title !== undefined) {
      todo.title = title;
    }
    if (completed !== undefined) {
      todo.completed = completed;
    }
    return todo;
  }

  deleteTodo(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) {
      return false;
    }
    this.todos.splice(index, 1);
    return true;
  }
}
