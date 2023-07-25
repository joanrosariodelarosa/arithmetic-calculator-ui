export interface Operation {
  id: number;
  operationType: string;
  cost: number
}

export interface Record {
  id: number;
  operation: Operation;
  amount: number;
  userId: number;
  userBalance: number;
  operationResponse: string;
  date: string;
  recordActive: boolean;
}
