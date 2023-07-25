import {Injectable} from '@angular/core';
import {OperatorType} from 'src/types';
import {OperationResponse} from 'src/app/models/operation-response.model'
import {HttpClientRequest} from "./http-client-request.service";
import {Observable} from "rxjs";
import {RecordResponseModel} from "../models/record-response.model";

@Injectable({
  providedIn: 'root',
})
export class ArithmeticApiService {
  constructor(private httpClientRequest: HttpClientRequest) {
  }

  calculate(
    operands: number[],
    operatorType: OperatorType | null
  ): Observable<OperationResponse> {
    return this.httpClientRequest.handleRequest('/operation/v1', {
      operands: operands,
      operationType: operatorType
    });
  }

  actionRecords(recordPage: number, recordSize: number, action: string, recordId: number): Observable<RecordResponseModel> {
    return this.httpClientRequest.handleRequest("/operation/records/v1", {
      action , recordPage, recordSize , recordId
    });
  }


}
