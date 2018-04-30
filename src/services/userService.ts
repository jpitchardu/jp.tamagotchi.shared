import { UserDataService } from '../data/index';

export class UserService {
  constructor(private readonly dataService: UserDataService) {}

  public saveUser(request: ISaveUserRequest): Promise<ISaveUserResponse> {
    return this.dataService
      .saveUser(request)
      .then(res => res as ISaveUserResponse);
  }

  public getUsers(request: IGetUsersRequest): Promise<IGetUsersResponse> {
    return this.dataService
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
