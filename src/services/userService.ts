import { UserDataService } from '@data/index';

import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from './serviceContracts';

export class UserService {
  constructor(private readonly userDataService: UserDataService) {}

  public saveUser(
    request: ISaveRequest<IUserModel>
  ): Promise<ISaveResponse<IUserModel>> {
    return this.userDataService
      .saveUser(request)
      .then(res => res as ISaveResponse<IUserModel>);
  }

  public getUsers(
    request: IGetRequest<IUserModel>
  ): Promise<IGetResponse<IUserModel>> {
    return this.userDataService
      .getUsers(request)
      .then(res => res as IGetResponse<IUserModel>);
  }
}

export interface IUserModel {
  id?: number;
  userName: string;
  password: string;
  email: string;
}
