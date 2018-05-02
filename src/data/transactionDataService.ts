import { promisify } from '../utils/index';
import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from './dataContracts';

export class TransactionDataService {
  constructor(private readonly transactionDataClient) {}

  public saveTransaction(
    request: ISaveRequest<ITransactionModel>
  ): Promise<ISaveResponse<ITransactionModel>> {
    return this.transactionDataClient
      .saveTransaction(request)
      .then(res => res as ISaveResponse<ITransactionModel>);
  }

  public getTransactions(
    request: IGetRequest<ITransactionModel>
  ): Promise<IGetResponse<ITransactionModel>> {
    return this.transactionDataClient
      .getTransactions(request)
      .then(res => res as IGetResponse<ITransactionModel>);
  }
}

export interface ITransactionModel {
  id?: number;
}
