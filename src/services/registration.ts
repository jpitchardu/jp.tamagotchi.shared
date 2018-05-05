import { validate } from 'class-validator';
import * as grpc from 'grpc';

import * as fs from 'fs';

import { PetOwnershipService } from './petOwnershipService';
import { PetService } from './petService';
import { TransactionService } from './transactionService';
import { UserService } from './userService';

function businessProtoPackageSelector(load, selector) {
  return selector(load.jp.tamagotchi.business.shared.services);
}

function protoRegistration(registry) {
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.protoServicesPaths.engineService;

      const clientType = businessProtoPackageSelector(
        grpc.load(`${config.protoPath}/${path}`),
        protoPackage => protoPackage.engine
      ).EngineService;

      return new clientType();
    },
    name: 'engineClient'
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

function serviceRegistration(registry) {
  registry({ type: PetService });
  registry({ type: PetOwnershipService });
  registry({ type: TransactionService });
  registry({ type: UserService });
}

export function registration(registry) {
  protoRegistration(registry);
  serviceRegistration(registry);

  registry({
    name: 'validate',
    value: validate
  });
}
