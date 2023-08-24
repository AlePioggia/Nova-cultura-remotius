import {
  AuthenticationService,
  Role,
} from './../../services/authentication.service';
import { Component, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import {
  CreateUserRequest,
  ICreateUserRequest,
} from 'src/app/interfaces/user.interface';
import { WalletService } from 'src/app/src/wallet/services/wallet.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  @ViewChild(DxFormComponent, { static: false }) form: DxFormComponent;

  roles: Role[] = this.authenticationService.getRoles();

  createUserRequest: ICreateUserRequest = new CreateUserRequest();

  constructor(
    private authenticationService: AuthenticationService,
    private walletService: WalletService
  ) {}

  onFormSubmit = async (e: any) => {
    if (this.form.instance.validate().isValid) {
      try {
        await this.authenticationService.createUser(this.createUserRequest);
        await this.walletService.createWalletWithMail(
          this.createUserRequest.mail
        );
      } catch (error) {
        throw error;
      }
    }
  };
}
