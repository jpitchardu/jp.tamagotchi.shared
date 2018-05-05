import * as scope from 'fndi';

import {
  IGetDataResponse,
  ISaveDataRequest,
  ISaveDataResponse
} from '../../data/dataContracts';
import {
  ITransactionDataModel,
  TransactionDataService
} from '../../data/transactionDataService';
import {
  GetRequest,
  GetResponse,
  SaveRequest,
  SaveResponse
} from '../serviceContracts';
import { ITransactionModel, TransactionService } from '../transactionService';

describe('Given a TransactionService', () => {
  const sutRegistration = registry => {
    registry({ type: TransactionService });
  };

  describe('When asked to SaveTransaction', () => {
    describe('And Request is invalid', () => {
      let sut: TransactionService;
      let validateMock;
      let transactionDataServiceFake: TransactionDataService;

      let request;
      let result;

      const validateRegistration = registry => {
        registry({ name: 'validate', value: jest.fn().mockRejectedValue({}) });
      };

      beforeAll(
        scope(
          registry => {
            sutRegistration(registry),
              validateRegistration(registry),
              registry({ type: TransactionDataService, value: {} });
          },
          async resolve => {
            sut = resolve(TransactionService);

            validateMock = resolve('validate');
            transactionDataServiceFake = resolve(TransactionDataService);

            request = {
              data: {
                description: '',
                image: 'fakeImg.txt',
                name: '',
                package: ''
              }
            };
            result = await sut.saveTransaction(request);
          }
        )
      );

      test('Result should be unsuccessful', () => {
        expect(result.successful).toBe(false);
      });

      test('It should have called validateFn with the correct request', () => {
        expect(validateMock).toHaveBeenCalledWith(request);
      });
    });

    describe('And Request is valid', () => {
      const validateRegistration = registry => {
        registry({ name: 'validate', value: jest.fn().mockResolvedValue({}) });
      };

      describe('And TransactionDataService::getTransactions runs correctly ', () => {
        let sut: TransactionService;
        let validateMock;
        let transactionDataServiceFake: TransactionDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: TransactionDataService,
            value: {
              saveTransaction: jest.fn().mockResolvedValue({
                data: {},
                message: 'Request successful',
                successful: true
              })
            }
          });
        };

        beforeAll(
          scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(TransactionService);

              validateMock = resolve('validate');
              transactionDataServiceFake = resolve(TransactionDataService);
              request = {
                data: {
                  description: 'string',
                  image: 'foo',
                  name: 'string',
                  package: 'string'
                }
              };
              result = await sut.saveTransaction(request);
            }
          )
        );
        test('result should be successful', () => {
          expect(result.successful).toBe(true);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test('it should have called TransactionDataService::saveTransaction with correct request', () => {
          expect(
            transactionDataServiceFake.saveTransaction
          ).toHaveBeenCalledWith(request);
          expect(
            transactionDataServiceFake.saveTransaction
          ).toHaveBeenCalledTimes(1);
        });
      });

      describe('And TransactionDataService::saveTransaction fails ', () => {
        let sut: TransactionService;
        let validateMock;
        let transactionDataServiceFake: TransactionDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: TransactionDataService,
            value: {
              saveTransaction: jest.fn().mockRejectedValue({
                data: {},
                message: 'Request unsuccessful',
                successful: false
              })
            }
          });
        };

        beforeAll(
          scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(TransactionService);

              validateMock = resolve('validate');
              transactionDataServiceFake = resolve(TransactionDataService);
              request = { data: {} };
              result = await sut.saveTransaction(request);
            }
          )
        );

        test('result should be unsuccessful', () => {
          expect(result.successful).toBe(false);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test('it should have called TransactionDataService::saveTransaction with correct request', () => {
          expect(
            transactionDataServiceFake.saveTransaction
          ).toHaveBeenCalledWith(request);
          expect(
            transactionDataServiceFake.saveTransaction
          ).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('When asked to GetTransactions', () => {
    describe('And Request is invalid', () => {
      let sut: TransactionService;
      let validateMock;
      let transactionDataServiceFake: TransactionDataService;

      let request;
      let result;
      const validateRegistration = registry => {
        registry({ name: 'validate', value: jest.fn().mockRejectedValue({}) });
      };

      beforeAll(
        scope(
          registry => {
            sutRegistration(registry),
              validateRegistration(registry),
              registry({ type: TransactionDataService, value: {} });
          },
          async resolve => {
            sut = resolve(TransactionService);

            validateMock = resolve('validate');
            transactionDataServiceFake = resolve(TransactionDataService);

            request = { size: 0 };
            result = await sut.getTransactions(request);
          }
        )
      );

      test('Result should be unsuccessful', () => {
        expect(result.successful).toBe(false);
      });

      test('It should have called validateFn with the correct request', () => {
        expect(validateMock).toHaveBeenCalledWith(request);
      });
    });

    describe('And Request is valid', () => {
      const validateRegistration = registry => {
        registry({ name: 'validate', value: jest.fn().mockResolvedValue({}) });
      };

      describe('And TransactionDataService::getTransactions runs correctly ', () => {
        let sut: TransactionService;
        let validateMock;
        let transactionDataServiceFake: TransactionDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: TransactionDataService,
            value: {
              getTransactions: jest
                .fn()
                .mockResolvedValue({ data: [], message: '', successful: true })
            }
          });
        };

        beforeAll(
          scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(TransactionService);

              validateMock = resolve('validate');
              transactionDataServiceFake = resolve(TransactionDataService);
              request = { size: 1 };
              result = await sut.getTransactions(request);
            }
          )
        );

        test('result should be successful', () => {
          expect(result.successful).toBe(true);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test('it should have called TransactionDataService::getTransactions with correct request', () => {
          expect(
            transactionDataServiceFake.getTransactions
          ).toHaveBeenCalledWith(request);
          expect(
            transactionDataServiceFake.getTransactions
          ).toHaveBeenCalledTimes(1);
        });
      });
      describe('And TransactionDataService::getTransactions fails ', () => {
        let sut: TransactionService;
        let validateMock;
        let transactionDataServiceFake: TransactionDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: TransactionDataService,
            value: {
              getTransactions: jest.fn().mockRejectedValue({
                data: {},
                message: 'Request unsuccessful',
                successful: false
              })
            }
          });
        };

        beforeAll(
          scope(
            registry => {
              sutRegistration(registry);
              validateRegistration(registry);
              dataServiceRegistration(registry);
            },
            async resolve => {
              sut = resolve(TransactionService);

              validateMock = resolve('validate');
              transactionDataServiceFake = resolve(TransactionDataService);

              request = { size: 1 };

              result = await sut.getTransactions(request);
            }
          )
        );

        test('result should be unsuccessful', () => {
          expect(result.successful).toBe(false);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test('it should have called TransactionDataService::getTransactions with correct request', () => {
          expect(
            transactionDataServiceFake.getTransactions
          ).toHaveBeenCalledWith(request);
          expect(
            transactionDataServiceFake.getTransactions
          ).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
