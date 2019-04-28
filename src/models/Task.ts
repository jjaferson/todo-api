import { User } from "./User";
import { TodoList } from "./TodoList";
import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
export { User, TodoList }

@ApiModel({
  description: 'Task',
  name: 'Task',
})
export class Task {

  @ApiModelProperty({
    description: "task title",
    required: true,
    itemType: SwaggerDefinitionConstant.STRING
  })
  private title: string;

  @ApiModelProperty({
    description: "task description",
    required: true,
    itemType: SwaggerDefinitionConstant.STRING
  })
  private description: string;

  private user: User;

  constructor(
    title: string,
    description: string,
    user: User,
    private createdAt?: Date,
    private updatedAt?: Date,
    private id?: string
  ) {
    this.title = title;
    this.description = description;
    this.user = user;
  }

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

  get getId(): string {
    return this.id;
  }
}