import { Task } from "./Task";
import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";
export { Task }

@ApiModel({
  description: 'TodoList',
  name: 'TodoList',
})
export class TodoList {

  @ApiModelProperty({
    description: "Subject of the list",
    required: true,
    itemType: SwaggerDefinitionConstant.STRING
  })
  private subject: string;

  @ApiModelProperty({
    description: "tasks for the todo list",
    required: false,
    model: "Task",
    itemType: SwaggerDefinitionConstant.ARRAY
  })  
  private tasks: Task[];

  constructor(
    subject: string,
    tasks: Task[],
    private createdAt?: Date,
    private updatedAt?: Date,
    private id?: string
  ){ 
    this.subject = subject;

    this.tasks = tasks;
  }

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

  get getId(): string {
    return this.id;
  }
}