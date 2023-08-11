export interface IWallet {
  mail: string;
  balance: number;
}

export class Wallet implements IWallet {
  mail: string;
  balance: number;
}
