import { Task } from "./Task";

export class TodoList {

  constructor(
    private subject: string,
    private tasks: Task[],
    private createdAt?: Date,
    private updatedAt?: Date,
    private id?: number
  ){ }

  get getSubject(): string {
    return this.subject
  }

  get getTasks(): Task[] {
    return this.tasks;
  }

  get getCreatedAt(): Date {
    return this.createdAt;
  }

  get getUpdatedAt(): Date {
    return this.updatedAt;
  }

  get getId(): number {
    return this.id;
  }
}