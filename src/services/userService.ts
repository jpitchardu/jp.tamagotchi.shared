import { UserDataService } from '@data/index';
import { Matches, MinLength } from 'class-validator';

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

export class UserService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly validate: validateFn
  ) {}

  public saveUser(
    request: SaveRequest<UserModel>
  ): Promise<SaveResponse<UserModel>> {
    return this.makeRequest(request, req => this.userDataService.saveUser(req));
  }

  public getUsers(
    request: GetRequest<UserModel>
  ): Promise<GetResponse<UserModel>> {
    return this.makeRequest(request, req => this.userDataService.getUsers(req));
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

export class UserModel {
  public id?: number;

  @MinLength(7, { message: 'Username is invalid' })
  public userName: string;

  @Matches(
    /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/,
    { message: 'Password is invalid' }
  )
  @MinLength(10, { message: 'Password is not long enough' })
  public password: string;

  @Matches(
    // tslint:disable-next-line:max-line-length
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    { message: 'Email is invalid' }
  )
  public email: string;
}
