import { validate } from 'class-validator';
import * as fs from 'fs';
import * as grpc from 'grpc';

import { PetOwnershipService } from './petOwnershipService';
import { PetService } from './petService';
import { TransactionService } from './transactionService';
import { UserService } from './userService';

/**
 * @param  {} load
 * @param  {} selector
 * @description helper function to avoid repeating package selection
 */
function businessProtoPackageSelector(load, selector) {
  return selector(load.jp.tamagotchi.business.shared.services);
}

/**
 * @param  {} registry
 * @description regisration for proto services
 */
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

      const clientType = businessProtoPackageSelector(
        grpc.load(`${config.protoPath}/${path}`),
        protoPackage => protoPackage.pet
      ).PetService;

      return new clientType();
    },
    name: 'sharedPetService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.protoServicesPaths.petService;

      const clientType =  businessProtoPackageSelector(
        grpc.load(`${config.protoPath}/${path}`),
        protoPackage => protoPackage.petOwnership
      ).PetOwnershipService;

      return new clientType();
    },
    name: 'sharedPetOwnershipService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.protoServicesPaths.transactionService;

      const clientType =  businessProtoPackageSelector(
        grpc.load(`${config.protoPath}/${path}`),
        protoPackage => protoPackage.transaction
      ).TransactionService;

      return new clientType();
    },
    name: 'sharedTransactionService'
  });
  registry({
    factory: resolve => {
      const config = resolve('config');
      const path = config.protoServicesPaths.userService;

      const clientType = businessProtoPackageSelector(
        grpc.load(`${config.protoPath}/${path}`),
        protoPackage => protoPackage.user
      ).UserService;

      return new clientType();
    },
    name: 'sharedUserService'
  });
}

/**
 * @param  {} registry
 * @description regisration for services
 */
function serviceRegistration(registry) {
  registry({ type: PetService });
  registry({ type: PetOwnershipService });
  registry({ type: TransactionService });
  registry({ type: UserService });
}

/**
 * @param  {} registry
 * @description regisration for full services module
 */
export function registration(registry) {
  protoRegistration(registry);
  serviceRegistration(registry);

  registry({ name: 'validate', value: validate });
}
