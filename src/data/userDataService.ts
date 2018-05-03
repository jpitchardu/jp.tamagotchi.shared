import { promisify } from '@utils/index';
import {
  IGetDataRequest,
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from './dataContracts';

export class UserDataService {
  constructor(private readonly userDataClient) {}

  public saveUser(
    request: ISaveDataRequest<IUserDataModel>
  ): Promise<ISaveDataResponse<IUserDataModel>> {
    return this.userDataClient
      .saveUser(request)
      .then(res => res as ISaveDataResponse<IUserDataModel>);
  }

  public getUsers(
    request: IGetDataRequest<IUserDataModel>
  ): Promise<IGetDataResponse<IUserDataModel>> {
    return this.userDataClient
      .getUsers(request)
      .then(res => res as IGetDataResponse<IUserDataModel>);
  }
}

export interface IUserDataModel {
  id?: number;
  userName: string;
  password: string;
  email: string;
}
