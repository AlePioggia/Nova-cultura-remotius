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
import { ToastService } from 'src/app/shared/services/toast.service';
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
    private walletService: WalletService,
    private toastService: ToastService
  ) {}

  onFormSubmit = async (e: any) => {
    if (this.form.instance.validate().isValid) {
      try {
        await this.authenticationService.createUser(this.createUserRequest);
        await this.walletService.createWalletWithMail(
          this.createUserRequest.mail
        );
        this.toastService.showSuccess('Registrazione avvenuta con successo!');
      } catch (error) {
        this.toastService.showError('Errore nella registrazione');
        throw error;
      }
    }
  };
}
