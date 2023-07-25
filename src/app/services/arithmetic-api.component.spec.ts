import {TestBed} from '@angular/core/testing';
import {ArithmeticApiService} from "./arithmetic-api.service";
import {HttpClientRequest} from "./http-client-request.service";
import {OperatorType} from "../../types";
import {OperationResponse} from "../models/operation-response.model";
import {of} from "rxjs";
import {RecordResponseModel} from "../models/record-response.model";

describe('ArithmeticApiService', () => {
  let service: ArithmeticApiService;
  let mockHttpClientRequest: jasmine.SpyObj<HttpClientRequest>;

  beforeEach(() => {

    const mockHttpClientRequestSpy = jasmine.createSpyObj('HttpClientRequest', ['handleRequest']);

    TestBed.configureTestingModule({
      providers: [
        ArithmeticApiService,
        {provide: HttpClientRequest, useValue: mockHttpClientRequestSpy},
      ],
    });

    service = TestBed.inject(ArithmeticApiService);
    mockHttpClientRequest = TestBed.inject(HttpClientRequest) as jasmine.SpyObj<HttpClientRequest>;
  });

  describe('calculate', () => {

    it('should call httpClientRequest with correct arguments', () => {
      const operands = [10, 5];
      const operatorType: OperatorType | null = null;

      const successResponse = {
        success: true,
        currentBalance: 1000,
        operationResult: 15,
      } as OperationResponse;

      mockHttpClientRequest.handleRequest.and.returnValue(of(successResponse));

      service.calculate(operands, operatorType).subscribe((response) => {

        expect(response).toEqual(successResponse);
        expect(mockHttpClientRequest.handleRequest).toHaveBeenCalledWith('/operation/v1', {
          operands: operands,
          operationType: operatorType,
        });
      });
    });
  });

  describe('actionRecords', () => {

    it('should call httpClientRequest with correct arguments', () => {
      const recordPage = 1;
      const recordSize = 10;
      const action = 'fetch';
      const recordId = 123;

      const successResponse  = {
      } as RecordResponseModel;

      mockHttpClientRequest.handleRequest.and.returnValue(of(successResponse));

      service.actionRecords(recordPage, recordSize, action, recordId)
        .subscribe((response) => {
          expect(response).toEqual(successResponse);
          expect(mockHttpClientRequest.handleRequest).toHaveBeenCalledWith('/operation/records/v1', {
            action,
            recordPage,
            recordSize,
            recordId,
          });
        });
    });
  });

});
