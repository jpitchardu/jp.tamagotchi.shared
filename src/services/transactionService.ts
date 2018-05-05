import { TransactionDataService } from '@data/index';

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

export class TransactionService {
  constructor(
    private readonly petOwnershipDataService: TransactionDataService,
    private readonly validate: validateFn
  ) {}

  public saveTransaction(
    request: SaveRequest<ITransactionModel>
  ): Promise<SaveResponse<ITransactionModel>> {
    return this.makeRequest(request, req =>
      this.petOwnershipDataService.saveTransaction(req)
    );
  }

  public getTransactions(
    request: GetRequest<ITransactionModel>
  ): Promise<GetResponse<ITransactionModel>> {
    return this.makeRequest(request, req =>
      this.petOwnershipDataService.getTransactions(req)
    );
  }

  private makeRequest<TReq extends object, TRes extends IDataResponse>(
    request: TReq,
    fn: (t: TReq) => Promise<TRes>
  ) {
    return this.validate(request)
      .then(() => fn(request))
      .then(res => ({ successful: true, data: res.data, message: '' }))
      .catch(err => ({ message: err.toString(), successful: false }));
  }
}

export interface ITransactionModel {
  id?: number;
}
