import * as scope from 'fndi';

import { IGetDataResponse, ISaveDataResponse } from '../dataContracts';
import { IUserDataModel, UserDataService } from '../userDataService';

const registration = registry => {
  registry({
    name: 'userDataClient',
    value: {
      getUsers: jest.fn().mockReturnValue(
        Promise.resolve<IGetDataResponse<IUserDataModel>>({
          data: [],
          message: '',
          successful: true
        })
      ),
      saveUser: jest.fn().mockImplementation(({ data }) =>
        Promise.resolve<ISaveDataResponse<IUserDataModel>>({
          data,
          message: 'User Saved',
          successful: true
        })
      )
    }
  });

  registry({ type: UserDataService });
};

describe(
  'Given a UserDataService',
  scope(registration, resolve => {
    let sut: UserDataService;
    let userDataClientMock;

    beforeAll(() => {
      sut = resolve(UserDataService);
      userDataClientMock = resolve('userDataClient');
    });

    describe('When asked to saveUser', () => {
      let result: ISaveDataResponse<IUserDataModel>;

      beforeAll(async () => {
        result = await sut.saveUser({
          data: {
            email: 'string',
            password: 'string',
            userName: 'string'
          }
        });
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called userDataClient::saveUser once', () => {
        expect(userDataClientMock.saveUser).toHaveBeenCalledTimes(1);
      });
    });

    describe('When asked to getUsers', () => {
      let result: IGetDataResponse<IUserDataModel>;

      beforeAll(async () => {
        result = await sut.getUsers({
          size: 1
        });
      });

      test('result should be successful', () => {
        expect(result.successful).toBe(true);
      });

      test('it should have called userDataClient::getUsers once', () => {
        expect(userDataClientMock.getUsers).toHaveBeenCalledTimes(1);
      });
    });
  })
);
