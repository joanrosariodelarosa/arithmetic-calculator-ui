import {Record} from "./record.model";

export interface OperationResponse {
  success: boolean;
  operationResult: number;
  randomString: string;
  currentBalance: number;
  errorMessage: string;
  recordCreated : Record;
}
