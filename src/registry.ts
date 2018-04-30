import { require } from './utils/index';

import * as grpc from 'grpc';

function businessProtoPackageSelector(load, selector) {
  return selector(load.jp.tamagotchi.business.shared.services);
}

function dataProtoPackageSelector(load, selector) {
  return selector(load.jp.tamagotchi.data.services);
}

function businessServicesRegistration(registry) {
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.protoServicesPaths.engineService;

      return businessProtoPackageSelector(
        grpc.load(`${config.protoPath}/${path}`),
        protoPackage => protoPackage.engine
      ).EngineService.service;
    },
    name: 'engineService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.protoServicesPaths.petService;

      return businessProtoPackageSelector(
        grpc.load(`${config.protoPath}/${path}`),
        protoPackage => protoPackage.pet
      ).PetService.service;
    },
    name: 'sharedPetService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.protoServicesPaths.petService;

      return businessProtoPackageSelector(
        grpc.load(`${config.protoPath}/${path}`),
        protoPackage => protoPackage.petOwnership
      ).PetOwnershipService.service;
    },
    name: 'sharedPetOwnershipService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.protoServicesPaths.transactionService;

      return businessProtoPackageSelector(
        grpc.load(`${config.protoPath}/${path}`),
        protoPackage => protoPackage.transaction
      ).TransactionService.service;
    },
    name: 'sharedTransactionService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.protoServicesPaths.userService;

      return businessProtoPackageSelector(
        grpc.load(`${config.protoPath}/${path}`),
        protoPackage => protoPackage.user
      ).UserService.service;
    },
    name: 'sharedUserService'
  });
}

function dataServicesRegistration(registry) {
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.dataProtoServicesPaths.petDataService;

      return dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService.service;
    },
    name: 'petDataService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.dataProtoServicesPaths.petDataService;

      return dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService.service;
    },
    name: 'petOwnershipDataService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.dataProtoServicesPaths.petDataService;

      return dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService.service;
    },
    name: 'transactionDataService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.dataProtoServicesPaths.petDataService;

      return dataProtoPackageSelector(
        grpc.load(
          `${config.protoPath}/${config.dataProtoServicesPaths.petDataService}`
        ),
        protoPackage => protoPackage.pet
      ).PetDataService.service;
    },
    name: 'userDataService'
  });
}
export function registration(env) {
  return registry => {
    registry({ name: 'config', value: require(`config/config.${env}`) });
    businessServicesRegistration(registry);
    dataServicesRegistration(registry);
  };
}
