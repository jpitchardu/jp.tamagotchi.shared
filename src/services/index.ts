import { ServiceDefinition } from 'grpc';

export * from './registration';

export * from './petService';
export * from './petOwnershipService';
export * from './transactionService';
export * from './userService';
export interface IServiceDefinition<T> {
  service: ServiceDefinition<T>;
  implementation: T;
}
