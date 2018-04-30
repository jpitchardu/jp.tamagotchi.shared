import { require } from './utils/index';

import * as grpc from 'grpc';

function businessProtoPackageSelector(load, selector) {
  return selector(load.jp.tamagotchi.business.shared.services);
}

export function registration(env) {
  return registry => {
    registry({ name: 'config', value: require(`config/config.${env}`) });
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
  };
}
