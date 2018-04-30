import { promisify } from '../utils/index';

export class UserDataService {
  constructor(private readonly userDataClient) {
    this.userDataClient.saveUser = promisify(this.userDataClient.saveUser);
    this.userDataClient.getUsers = promisify(this.userDataClient.getUsers);
  }

  public saveUser(request: ISaveUserRequest): Promise<ISaveUserResponse> {
    return this.userDataClient
      .saveUser(request)
      .then(res => res as ISaveUserResponse);
  }

  public getUsers(request: IGetUsersRequest): Promise<IGetUsersResponse> {
    return this.userDataClient
      .getUsers(request)
      .then(res => res as IGetUsersResponse);
  }
}

export interface ISaveUserRequest {
  User: IUserModel;
}

export interface ISaveUserResponse {
  successful: boolean;
  message: string;
  User: IUserModel;
}

export interface IGetUsersRequest {
  size: number;
  example: IUserModel;
}

export interface IGetUsersResponse {
  Users: IUserModel[];
}

export interface IUserModel {
  id: number;
  userName: string;
  password: string;
  email: string;
}
