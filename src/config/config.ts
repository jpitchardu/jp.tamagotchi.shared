export const config = {
  ip: '127.0.0.1',
  port: 2222,
  protoPath: '../proto',
  protoServicesPaths: {
    engineService: 'business/engine/executionService.proto',
    petOwnershipService: 'service/petOwnership/petOwnershipService.proto',
    petService: 'service/pet/petService.proto',
    transactionService: 'service/transaction/transactionService.proto',
    userService: 'service/user/userService.proto'
  }
};
