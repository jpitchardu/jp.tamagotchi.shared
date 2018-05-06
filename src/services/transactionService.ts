import { TransactionDataService } from '@data/index';
import { SharedService } from '@services/sharedService';

import {
  GetRequest,
  GetResponse,
  SaveRequest,
  SaveResponse,
  validateFn
} from './serviceContracts';

interface IDataResponse {
  data: any;
}

export class TransactionService extends SharedService {
  /**
   * @param  {TransactionDataService} privatereadonlytransactionDataService
   * @param  {validateFn} protectedreadonlyvalidate
   */
  constructor(
    private readonly transactionDataService: TransactionDataService,
    protected readonly validate: validateFn
  ) {
    super(validate);
  }

  /**
   * @param  {SaveRequest<ITransactionModel>} request
   * @returns {Promise<SaveResponse<ITransactionModel>>} response
   */
  public saveTransaction(
    request: SaveRequest<ITransactionModel>
  ): Promise<SaveResponse<ITransactionModel>> {
    return this.makeRequest(request, req =>
      this.transactionDataService.saveTransaction(req)
    );
  }

  /**
   * @param  {GetRequest<ITransactionModel>} request
   * @returns {Promise<GetResponse<ITransactionModel>>} response
   */
  public getTransactions(
    request: GetRequest<ITransactionModel>
  ): Promise<GetResponse<ITransactionModel>> {
    return this.makeRequest(request, req =>
      this.transactionDataService.getTransactions(req)
    );
  }
}

export interface ITransactionModel {
  id?: number;
}
