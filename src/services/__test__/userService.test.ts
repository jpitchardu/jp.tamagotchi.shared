import * as scope from 'fndi';

import {IGetDataResponse, ISaveDataRequest, ISaveDataResponse} from '../../data/dataContracts';
import {IUserDataModel, UserDataService} from '../../data/userDataService';
import {GetRequest, GetResponse, SaveRequest, SaveResponse} from '../serviceContracts';
import {UserModel, UserService} from '../userService';

describe('Given a UserService', () => {
  const sutRegistration = registry => {
    registry({type: UserService});
  };

  describe('When asked to SaveUser', () => {
    describe('And Request is invalid', () => {
      let sut: UserService;
      let validateMock;
      let userDataServiceFake: UserDataService;

      let request;
      let result;

      const validateRegistration = registry => {
        registry({name: 'validate', value: jest.fn().mockRejectedValue({})});
      };

      beforeAll(scope(
          registry => {
            sutRegistration(registry), validateRegistration(registry),
                registry({type: UserDataService, value: {}});
          },
          async resolve => {
            sut = resolve(UserService);

            validateMock = resolve('validate');
            userDataServiceFake = resolve(UserDataService);

            request = {
              data: {
                email: 'foo@bar',
                password: 'foo@4BAR',
                userName: 'someLongString',
              }
            };
            result = await sut.saveUser(request);
          }));

      test('Result should be unsuccessful', () => {
        expect(result.successful).toBe(false);
      });

      test('It should have called validateFn with the correct request', () => {
        expect(validateMock).toHaveBeenCalledWith(request);
      });
    });

    describe('And Request is valid', () => {
      const validateRegistration = registry => {
        registry({name: 'validate', value: jest.fn().mockResolvedValue({})});
      };

      describe('And UserDataService::getUsers runs correctly ', () => {
        let sut: UserService;
        let validateMock;
        let userDataServiceFake: UserDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: UserDataService,
            value: {
              saveUser: jest.fn().mockResolvedValue({
                data: {},
                message: 'Request successful',
                successful: true
              })
            }
          });
        };

        beforeAll(scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(UserService);

              validateMock = resolve('validate');
              userDataServiceFake = resolve(UserDataService);
              request = {
                data: {
                  email: 'foo@bar',
                  password: 'foo@4BAR',
                  userName: 'someLongString',
                }
              };
              result = await sut.saveUser(request);
            }));
        test('result should be successful', () => {
          expect(result.successful).toBe(true);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test(
            'it should have called UserDataService::saveUser with correct request',
            () => {
              expect(userDataServiceFake.saveUser)
                  .toHaveBeenCalledWith(request);
              expect(userDataServiceFake.saveUser).toHaveBeenCalledTimes(1);
            });
      });

      describe('And UserDataService::saveUser fails ', () => {
        let sut: UserService;
        let validateMock;
        let userDataServiceFake: UserDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: UserDataService,
            value: {
              saveUser: jest.fn().mockRejectedValue({
                data: {},
                message: 'Request unsuccessful',
                successful: false
              })
            }
          });
        };

        beforeAll(scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(UserService);

              validateMock = resolve('validate');
              userDataServiceFake = resolve(UserDataService);
              request = {
                data: {
                  email: 'foo@bar',
                  password: 'foo@4BAR',
                  userName: 'someLongString',
                }
              };
              result = await sut.saveUser(request);
            }));

        test('result should be unsuccessful', () => {
          expect(result.successful).toBe(false);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test(
            'it should have called UserDataService::saveUser with correct request',
            () => {
              expect(userDataServiceFake.saveUser)
                  .toHaveBeenCalledWith(request);
              expect(userDataServiceFake.saveUser).toHaveBeenCalledTimes(1);
            });
      });
    });
  });

  describe('When asked to GetUsers', () => {
    describe('And Request is invalid', () => {
      let sut: UserService;
      let validateMock;
      let userDataServiceFake: UserDataService;

      let request;
      let result;
      const validateRegistration = registry => {
        registry({name: 'validate', value: jest.fn().mockRejectedValue({})});
      };

      beforeAll(scope(
          registry => {
            sutRegistration(registry), validateRegistration(registry),
                registry({type: UserDataService, value: {}});
          },
          async resolve => {
            sut = resolve(UserService);

            validateMock = resolve('validate');
            userDataServiceFake = resolve(UserDataService);

            request = {size: 0};
            result = await sut.getUsers(request);
          }));

      test('Result should be unsuccessful', () => {
        expect(result.successful).toBe(false);
      });

      test('It should have called validateFn with the correct request', () => {
        expect(validateMock).toHaveBeenCalledWith(request);
      });
    });

    describe('And Request is valid', () => {
      const validateRegistration = registry => {
        registry({name: 'validate', value: jest.fn().mockResolvedValue({})});
      };

      describe('And UserDataService::getUsers runs correctly ', () => {
        let sut: UserService;
        let validateMock;
        let userDataServiceFake: UserDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: UserDataService,
            value: {
              getUsers: jest.fn().mockResolvedValue(
                  {data: [], message: '', successful: true})
            }
          });
        };

        beforeAll(scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(UserService);

              validateMock = resolve('validate');
              userDataServiceFake = resolve(UserDataService);
              request = {size: 1};
              result = await sut.getUsers(request);
            }));

        test('result should be successful', () => {
          expect(result.successful).toBe(true);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test(
            'it should have called UserDataService::getUsers with correct request',
            () => {
              expect(userDataServiceFake.getUsers)
                  .toHaveBeenCalledWith(request);
              expect(userDataServiceFake.getUsers).toHaveBeenCalledTimes(1);
            });
      });
      describe('And UserDataService::getUsers fails ', () => {
        let sut: UserService;
        let validateMock;
        let userDataServiceFake: UserDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: UserDataService,
            value: {
              getUsers: jest.fn().mockRejectedValue({
                data: {},
                message: 'Request unsuccessful',
                successful: false
              })
            }
          });
        };

        beforeAll(scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(UserService);

              validateMock = resolve('validate');
              userDataServiceFake = resolve(UserDataService);

              request = {size: 1};

              result = await sut.getUsers(request);
            }));

        test('result should be unsuccessful', () => {
          expect(result.successful).toBe(false);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test(
            'it should have called UserDataService::getUsers with correct request',
            () => {
              expect(userDataServiceFake.getUsers)
                  .toHaveBeenCalledWith(request);
              expect(userDataServiceFake.getUsers).toHaveBeenCalledTimes(1);
            });
      });
    });
  });
});
