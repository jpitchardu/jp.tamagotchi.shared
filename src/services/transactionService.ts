import { TransactionDataService } from '../data/index';

export class TransactionService {
  constructor(private readonly dataService: TransactionDataService) {}
}
