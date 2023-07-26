
export interface IAuthenticationRequest {
    email: string;
    password: string
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
}

export class CreateUserRequest implements ICreateUserRequest {
    email: string;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    password: string;
    roleId: number;

    constructor(email: string, firstName: string, lastName: string, age: number, address: string, password: string, isTeacher: number = 0) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.address = address;
        this.password = password;
        this.roleId = isTeacher;
    }

}