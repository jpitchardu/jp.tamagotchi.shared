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
  constructor(
    private readonly transactionDataService: TransactionDataService,
    protected readonly validate: validateFn
  ) {
    super(validate);
  }

  public saveTransaction(
    request: SaveRequest<ITransactionModel>
  ): Promise<SaveResponse<ITransactionModel>> {
    return this.makeRequest(request, req =>
      this.transactionDataService.saveTransaction(req)
    );
  }

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
