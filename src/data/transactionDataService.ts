import { promisify } from '../utils/index';
import {
  IGetDataRequest,
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from './dataContracts';

export class TransactionDataService {
  constructor(private readonly transactionDataClient) {}

  public saveTransaction(
    request: ISaveDataRequest<ITransactionDataModel>
  ): Promise<ISaveDataResponse<ITransactionDataModel>> {
    return this.transactionDataClient
      .saveTransaction(request)
      .then(res => res as ISaveDataResponse<ITransactionDataModel>);
  }

  public getTransactions(
    request: IGetDataRequest<ITransactionDataModel>
  ): Promise<IGetDataResponse<ITransactionDataModel>> {
    return this.transactionDataClient
      .getTransactions(request)
      .then(res => res as IGetDataResponse<ITransactionDataModel>);
  }
}

export interface ITransactionDataModel {
  id?: number;
}
