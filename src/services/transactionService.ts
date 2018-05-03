import { TransactionDataService } from '@data/index';

import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from './serviceContracts';

export class TransactionService {
  constructor(private readonly transactionDataService: TransactionDataService) {}

  public saveTransaction(
    request: ISaveRequest<ITransactionModel>
  ): Promise<ISaveResponse<ITransactionModel>> {
    return this.transactionDataService
      .saveTransaction(request)
      .then(res => res as ISaveResponse<ITransactionModel>);
  }

  public getTransactions(
    request: IGetRequest<ITransactionModel>
  ): Promise<IGetResponse<ITransactionModel>> {
    return this.transactionDataService
      .getTransactions(request)
      .then(res => res as IGetResponse<ITransactionModel>);
  }
}

export interface ITransactionModel {
  id?: number;
}
