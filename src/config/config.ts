export const config = {
  ip: '127.0.0.1',
  port: 2222,
  protoPath: '../proto',
  protoServicesPaths: {
    engineService: 'business/engine/executionService.proto',
    petOwnershipService:
      'business/service/petOwnership/petOwnershipService.proto',
    petService: 'business/service/pet/petService.proto',
    transactionService: 'business/service/transaction/transactionService.proto',
    userService: 'business/service/user/userService.proto'
  },
  // tslint:disable-next-line:object-literal-sort-keys
  dataProtoServicesPaths: {
    petDataService: 'data/pet/petService.proto',
    petOwnershipDataService: 'data/petOwnership/petOwnershipService.proto',
    transactionDataService: 'data/transaction/transactionService.proto',
    userDataService: 'data/user/userService.proto'
  }
};
