export interface IAuthenticationRequest {
  email: string;
  password: string;
}

export class AuthenticationRequest implements IAuthenticationRequest {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}

export interface ICreateUserRequest {
  mail: string;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  password: string;
  roleId: number;
  subjects: string[];
}

export class CreateUserRequest implements ICreateUserRequest {
  mail: string;
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
    this.mail = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.address = address;
    this.password = password;
    this.roleId = roleId;
    this.subjects = subjects;
  }
}
