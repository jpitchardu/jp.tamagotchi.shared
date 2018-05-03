import * as scope from 'fndi';

import {
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from '@data/dataContracts';

import { IUserDataModel, UserDataService } from '@data/userDataService';

import { IUserModel, UserService } from '@services/userService';

import {
  IGetRequest,
  IGetResponse,
  ISaveRequest,
  ISaveResponse
} from '@services/serviceContracts';

const registration = registry => {
  registry({
    type: UserDataService,
    value: {
      getUsers: jest.fn().mockResolvedValue({
        data: [],
        message: 'Request successful',
        successful: true
      }),
      saveUser: jest.fn().mockResolvedValue({
        data: {},
        message: 'Request successful',
        successful: true
      })
    }
  });

  registry({ type: UserService });
};

describe(
  'Given a UserService',
  scope(registration, resolve => {
    let sut: UserService;
    let userDataServiceFake: UserDataService;

    beforeAll(() => {
      sut = resolve(UserService);
      userDataServiceFake = resolve(UserDataService);
    });

    describe('When asked to SaveUser', () => {
      let result: ISaveResponse<IUserModel>;
      let request: ISaveRequest<IUserDataModel>;

      beforeAll(async () => {
        request = {
          data: {
            email: 'string',
            password: 'string',
            userName: 'string'
          }
        };

        result = await sut.saveUser(request);
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called UserDataService::saveUser with correct request', () => {
        expect(userDataServiceFake.saveUser).toHaveBeenCalledWith(request);
        expect(userDataServiceFake.saveUser).toHaveBeenCalledTimes(1);
      });
    });

    describe('When asked to GetUsers', () => {
      let result: IGetResponse<IUserModel>;
      let request: IGetRequest<IUserDataModel>;

      beforeAll(async () => {
        request = { size: 1 };

        result = await sut.getUsers(request);
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called UserDataService::saveUser with correct request', () => {
        expect(userDataServiceFake.getUsers).toHaveBeenCalledWith(request);
        expect(userDataServiceFake.getUsers).toHaveBeenCalledTimes(1);
      });
    });
  })
);
