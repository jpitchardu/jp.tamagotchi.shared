import { promisify } from '../utils/index';

export class TransactionDataService {
  constructor(private readonly transactionDataClient) {
    this.transactionDataClient.saveTransaction = promisify(
      this.transactionDataClient.saveTransaction
    );
    this.transactionDataClient.getTransactions = promisify(
      this.transactionDataClient.getTransactions
    );
  }

  public saveTransaction(
    request: ISaveTransactionRequest
  ): Promise<ISaveTransactionResponse> {
    return this.transactionDataClient
      .saveTransaction(request)
      .then(res => res as ISaveTransactionResponse);
  }

  public getTransactions(
    request: IGetTransactionsRequest
  ): Promise<IGetTransactionsResponse> {
    return this.transactionDataClient
      .getTransactions(request)
      .then(res => res as IGetTransactionsResponse);
  }
}

export interface ISaveTransactionRequest {
  Transaction: ITransactionModel;
}

export interface ISaveTransactionResponse {
  successful: boolean;
  message: string;
  Transaction: ITransactionModel;
}

export interface IGetTransactionsRequest {
  size: number;
  example: ITransactionModel;
}

export interface IGetTransactionsResponse {
  Transactions: ITransactionModel[];
}

export interface ITransactionModel {
  id: number;
}
