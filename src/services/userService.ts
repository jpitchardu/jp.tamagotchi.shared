import { UserDataService } from '@data/index';
import { Matches, MinLength } from 'class-validator';

import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse,
  validateFn
} from './serviceContracts';

export class UserService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly validate: validateFn
  ) {}

  public saveUser(
    request: ISaveRequest<UserModel>
  ): Promise<ISaveResponse<UserModel>> {
    return this.validate(request)
      .then(() => this.userDataService.saveUser(request))
      .then(res => res as ISaveResponse<UserModel>);
  }

  public getUsers(
    request: IGetRequest<UserModel>
  ): Promise<IGetResponse<UserModel>> {
    return this.validate(request)
      .then(() => this.userDataService.getUsers(request))
      .then(res => res as IGetResponse<UserModel>);
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
