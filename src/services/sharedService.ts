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

/**
 * @description Base service with shared behavior
 * @author jpichardo
 */
export class SharedService {
  /**
   * @param  {validateFn} protectedreadonlyvalidate
   */
  constructor(protected readonly validate: validateFn) {}
  
  /**
   * @param  {TReq} request
   * @param  {(t:TReq)=>Promise<TRes>} fn
   */
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
