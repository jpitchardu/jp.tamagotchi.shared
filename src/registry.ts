import * as bunyan from 'bunyan';
import { Server as GrpcServer } from 'grpc';

import { registration as dataRegistration } from './data/index';
import { Server } from './server';
import {
  IServiceDefinition,
  PetOwnershipService,
  PetService,
  registration as servicesRegistration,
  TransactionService,
  UserService
} from './services/index';


/**
 * @param  {} env
 * @returns {(registry) => void} registration function
 * @description regisration for full app
 */
export function registration(env = '') {
  return registry => {

    // Register config file based on env
    registry({
      name: 'config',
      value: require(env ? `./config/config.${env}` : './config/config').config
    });

    // Register data module
    dataRegistration(registry);

    // Register services module
    servicesRegistration(registry);

    // Register bunyan logger and logger factory to create child loggers based on class
    registry({
      factory: resolve => bunyan.createLogger({ name: 'SharedBussinesLogger' }),
      name: 'log'
    });
    registry({
      factory: resolve => className => resolve('log').child({ className }),
      name: 'logFactory'
    });

    // Register Server instantiating logic
    registry({
      factory: resolve => {
        const services = [
          {
            implementation: resolve(PetService),
            service: resolve('sharedPetService')
          },
          {
            implementation: resolve(PetOwnershipService),
            service: resolve('sharedPetService')
          },
          {
            implementation: resolve(TransactionService),
            service: resolve('sharedTransactionService')
          },
          {
            implementation: resolve(UserService),
            service: resolve('sharedUserService')
          }
        ];

        const grpcServer = new GrpcServer();

        const config = resolve('config');
        const logFactory = resolve('logFactory');

        return new Server(grpcServer, config, services, logFactory);
      },
      type: Server
    });
  };
}
