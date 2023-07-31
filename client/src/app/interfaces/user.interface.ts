export interface IAuthenticationRequest {
  email: string;
  password: string;
}

export class AuthenticationRequest implements IAuthenticationRequest {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export interface ICreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  password: string;
  roleId: number;
  subjects: string[];
}

export class CreateUserRequest implements ICreateUserRequest {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  password: string;
  roleId: number;
  subjects: string[];

  constructor() {}

  setUser(
    email: string,
    firstName: string,
    lastName: string,
    age: number,
    address: string,
    password: string,
    roleId: number = 0,
    subjects: string[]
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.address = address;
    this.password = password;
    this.roleId = roleId;
    this.subjects = subjects;
  }
}
