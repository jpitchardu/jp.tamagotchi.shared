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

export class SharedService {
  constructor(protected readonly validate: validateFn) {}

  protected makeRequest<TReq extends object, TRes extends IDataResponse>(
    request: TReq,
    fn: (t: TReq) => Promise<TRes>
  ) {
    return this.validate(request)
      .then(() => fn(request))
      .then(res => ({ successful: true, data: res.data, message: '' }))
      .catch(err => ({ message: err.toString(), successful: false }));
  }
}

export interface IPetOwnershipModel {
  id?: number;
}
