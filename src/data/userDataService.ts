import { promisify } from '../utils/index';
import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from './dataContracts';

export class UserDataService {
  constructor(private readonly userDataClient) {}

  public saveUser(
    request: ISaveRequest<IUserModel>
  ): Promise<ISaveResponse<IUserModel>> {
    return this.userDataClient
      .saveUser(request)
      .then(res => res as ISaveResponse<IUserModel>);
  }

  public getUsers(
    request: IGetRequest<IUserModel>
  ): Promise<IGetResponse<IUserModel>> {
    return this.userDataClient
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
