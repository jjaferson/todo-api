export class User{

  constructor(  
    private name: string,
    private email: string,
    private password?: string,
    private createdAt?: Date,
    private updatedAt?: Date,
    private id?: string,
  ) {}

  get getName(): string {
    return this.name;
  }

  get getEmail(): string {
    return this.email;
  }

  get getCreatedAtDate(): Date {
    return this.createdAt;
  }

  get getUpdatedAtDate(): Date {
    return this.updatedAt;
  }

  get getPassword(): string {
    return this.password;
  }

  get getId(): string {
    return this.id;
  }


}