import { ApiModel, ApiModelProperty, SwaggerDefinitionConstant } from "swagger-express-ts";

@ApiModel({
  description: 'Login',
  name: 'Login',
})
export class Login {

  @ApiModelProperty({
    description: "Email of the user",
    required: true,
    itemType: SwaggerDefinitionConstant.STRING
  })
  email: string;

  @ApiModelProperty({
    description: "Password of the user",
    required: true,
    itemType: SwaggerDefinitionConstant.STRING
  })
  password: string;
}