import * as scope from 'fndi';

import {IGetDataResponse, ISaveDataRequest, ISaveDataResponse} from '../../data/dataContracts';
import {IPetDataModel, PetDataService} from '../../data/petDataService';
import {PetModel, PetService} from '../petService';
import {GetRequest, GetResponse, SaveRequest, SaveResponse} from '../serviceContracts';

describe('Given a PetService', () => {
  const sutRegistration = registry => {
    registry({type: PetService});
  };

  describe('When asked to SavePet', () => {
    describe('And Request is invalid', () => {
      let sut: PetService;
      let validateMock;
      let petDataServiceFake: PetDataService;

      let request;
      let result;

      const validateRegistration = registry => {
        registry({name: 'validate', value: jest.fn().mockRejectedValue({})});
      };

      beforeAll(scope(
          registry => {
            sutRegistration(registry), validateRegistration(registry),
                registry({type: PetDataService, value: {}});
          },
          async resolve => {
            sut = resolve(PetService);

            validateMock = resolve('validate');
            petDataServiceFake = resolve(PetDataService);

            request = {
              data: {
                description: '',
                image: 'fakeImg.txt',
                name: '',
                package: ''
              }
            };
            result = await sut.savePet(request);
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

      describe('And PetDataService::getPets runs correctly ', () => {
        let sut: PetService;
        let validateMock;
        let petDataServiceFake: PetDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: PetDataService,
            value: {
              savePet: jest.fn().mockResolvedValue({
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
              sut = resolve(PetService);

              validateMock = resolve('validate');
              petDataServiceFake = resolve(PetDataService);
              request = {
                data: {
                  description: 'string',
                  image: 'foo',
                  name: 'string',
                  package: 'string'
                }
              };
              result = await sut.savePet(request);
            }));
        test('result should be successful', () => {
          expect(result.successful).toBe(true);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test(
            'it should have called PetDataService::savePet with correct request',
            () => {
              expect(petDataServiceFake.savePet).toHaveBeenCalledWith(request);
              expect(petDataServiceFake.savePet).toHaveBeenCalledTimes(1);
            });
      });

      describe('And PetDataService::savePet fails ', () => {
        let sut: PetService;
        let validateMock;
        let petDataServiceFake: PetDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: PetDataService,
            value: {
              savePet: jest.fn().mockRejectedValue({
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
              sut = resolve(PetService);

              validateMock = resolve('validate');
              petDataServiceFake = resolve(PetDataService);
              request = {
                data: {
                  description: 'string',
                  image: 'foo',
                  name: 'string',
                  package: 'string'
                }
              };
              result = await sut.savePet(request);
            }));

        test('result should be unsuccessful', () => {
          expect(result.successful).toBe(false);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test(
            'it should have called PetDataService::savePet with correct request',
            () => {
              expect(petDataServiceFake.savePet).toHaveBeenCalledWith(request);
              expect(petDataServiceFake.savePet).toHaveBeenCalledTimes(1);
            });
      });
    });
  });

  describe('When asked to GetPets', () => {
    describe('And Request is invalid', () => {
      let sut: PetService;
      let validateMock;
      let petDataServiceFake: PetDataService;

      let request;
      let result;
      const validateRegistration = registry => {
        registry({name: 'validate', value: jest.fn().mockRejectedValue({})});
      };

      beforeAll(scope(
          registry => {
            sutRegistration(registry), validateRegistration(registry),
                registry({type: PetDataService, value: {}});
          },
          async resolve => {
            sut = resolve(PetService);

            validateMock = resolve('validate');
            petDataServiceFake = resolve(PetDataService);

            request = {size: 0};
            result = await sut.getPets(request);
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

      describe('And PetDataService::getPets runs correctly ', () => {
        let sut: PetService;
        let validateMock;
        let petDataServiceFake: PetDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: PetDataService,
            value: {
              getPets: jest.fn().mockResolvedValue(
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
              sut = resolve(PetService);

              validateMock = resolve('validate');
              petDataServiceFake = resolve(PetDataService);
              request = {size: 1};
              result = await sut.getPets(request);
            }));

        test('result should be successful', () => {
          expect(result.successful).toBe(true);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test(
            'it should have called PetDataService::getPets with correct request',
            () => {
              expect(petDataServiceFake.getPets).toHaveBeenCalledWith(request);
              expect(petDataServiceFake.getPets).toHaveBeenCalledTimes(1);
            });
      });
      describe('And PetDataService::getPets fails ', () => {
        let sut: PetService;
        let validateMock;
        let petDataServiceFake: PetDataService;

        let request;
        let result;

        const dataServiceRegistration = registry => {
          registry({
            type: PetDataService,
            value: {
              getPets: jest.fn().mockRejectedValue({
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
              sut = resolve(PetService);

              validateMock = resolve('validate');
              petDataServiceFake = resolve(PetDataService);

              request = {size: 1};

              result = await sut.getPets(request);
            }));

        test('result should be unsuccessful', () => {
          expect(result.successful).toBe(false);
        });

        test('it should have called validate with correct request', () => {
          expect(validateMock).toHaveBeenCalledWith(request);
        });

        test(
            'it should have called PetDataService::getPets with correct request',
            () => {
              expect(petDataServiceFake.getPets).toHaveBeenCalledWith(request);
              expect(petDataServiceFake.getPets).toHaveBeenCalledTimes(1);
            });
      });
    });
  });
});
