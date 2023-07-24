
export interface IAuthenticationRequest {
    email: string;
    password: string
}

export class AuthenticationRequest implements IAuthenticationRequest {
    email: string;
    password: string;

    constructor(mail: string, password: string) {
        this.email = mail;
        this.password = password;
    }
}