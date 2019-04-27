import { User } from "./User";

export class Task {

  constructor(
    private title: string,
    private description: string,
    private user: User,
    private createdAt?: Date,
    private updatedAt?: Date
  ) {}

  get getTitle(): string {
    return this.title;
  }

  get getDescription(): string {
    return this.description;
  }

  get getUser(): User {
    return this.user;
  }

  get getCreatedAt(): Date {
    return this.createdAt;
  }

  get getUpdatedAt(): Date {
    return this.updatedAt;
  }
}