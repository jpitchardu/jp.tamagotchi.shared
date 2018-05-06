import { promisify } from '@utils/index';

import {
  IGetDataRequest,
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from './dataContracts';

/**
 * @description Transaction Client Service for Data Layer
 * @author jpichardo
 */
export class TransactionDataService {

  constructor(private readonly transactionDataClient) {}

  /**
   * @param  {ISaveDataRequest<ITransactionDataModel>} request
   * @returns {Promise<ISaveDataResponse<ITransactionDataModel>>} The response from the data service
   */
  public saveTransaction(
    request: ISaveDataRequest<ITransactionDataModel>
  ): Promise<ISaveDataResponse<ITransactionDataModel>> {
    return this.transactionDataClient
      .saveTransaction(request)
      .then(res => res as ISaveDataResponse<ITransactionDataModel>);
  }

  /**
   * @param  {IGetDataRequest<ITransactionDataModel>} request
   * @returns {Promise<IGetDataResponse<ITransactionDataModel>>} The response from the data service
   */
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
