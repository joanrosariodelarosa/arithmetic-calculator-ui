import {TestBed} from '@angular/core/testing';
import {HttpClientRequest} from "./http-client-request.service";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {LoginResponse} from "../models/token.model";
import {HttpClient} from "@angular/common/http";

describe('HttpClientRequest', () => {

  let service: HttpClientRequest;
  let mockHttpClient: jasmine.SpyObj<HttpClient>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const mockHttpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    const mockRouterSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        HttpClientRequest,
        {provide: HttpClient, useValue: mockHttpClientSpy},
        {provide: Router, useValue: mockRouterSpy},
      ],
    });

    service = TestBed.inject(HttpClientRequest);
    mockHttpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  describe('login', () => {
    it('should call handleRequest with correct arguments', () => {
      const endpoint = '/operation/v1/auth';
      const requestBody = {username: 'testuser', password: 'testpassword'};
      const loginResponse = {} as LoginResponse;
      mockHttpClient.post.and.returnValue(of(loginResponse));

      service.login(endpoint, requestBody);

      expect(mockHttpClient.post).toHaveBeenCalledWith(endpoint, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
      });
    });
  });
});
