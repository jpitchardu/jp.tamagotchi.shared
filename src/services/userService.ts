import { Matches, MinLength } from 'class-validator';

import { UserDataService } from '@data/index';
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

export class UserService extends SharedService {
  constructor(
    private readonly userDataService: UserDataService,
    protected readonly validate: validateFn
  ) {
    super(validate);
  }

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
