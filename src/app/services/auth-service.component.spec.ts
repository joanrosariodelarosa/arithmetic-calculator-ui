import {TestBed} from '@angular/core/testing';
import {HttpClientRequest} from "./http-client-request.service";
import {of} from "rxjs";
import {AuthService} from "./auth-service.service";
import {Router} from "@angular/router";
import {LoginResponse} from "../models/token.model";

describe('AuthService', () => {
  let service: AuthService;
  let mockHttpClientRequest: jasmine.SpyObj<HttpClientRequest>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {

    const mockHttpClientRequestSpy = jasmine.createSpyObj('HttpClientRequest', ['login', 'handleRequest']);
    const mockRouterSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: HttpClientRequest, useValue: mockHttpClientRequestSpy },
        { provide: Router, useValue: mockRouterSpy },
      ],
    });

    service = TestBed.inject(AuthService);
    mockHttpClientRequest = TestBed.inject(HttpClientRequest) as jasmine.SpyObj<HttpClientRequest>;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  describe('login', () => {
    it('should call httpClientRequest.login and navigate to /calculator on success', () => {
      const username = 'testuser';
      const password = 'testpassword';

      const successResponse = {
        access_token: 'sample_access_token',
        userName: 'testuser',
      } as LoginResponse;

      mockHttpClientRequest.login.and.returnValue(of(successResponse));

      service.login(username, password);

      // Expect
      expect(mockHttpClientRequest.login).toHaveBeenCalledWith('/operation/v1/auth', { username, password });
      expect(localStorage.getItem('access_token')).toBe('sample_access_token');
      expect(localStorage.getItem('userName')).toBe('testuser');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/calculator']);
    });
  });

  describe('isUserAuthenticated', () => {

    it('should return false when access token is expired or invalid', () => {
      const expiredAccessToken = 'eyJhbGciOiJIUzI1NiJ9.' +
        'eyJzdWIiOiJqb2Nhcm9zYSIsImlhdCI6MTY5MDAwNTA0MiwiZXhwIjoxNjkwMDA1MjgyfQ' +
        '.4n2dBGnTswFd83ne_CdvrE_OtF3GCa8UYg9wAXMzL5M';
      localStorage.setItem('access_token', expiredAccessToken);

      const isAuthenticated = service.isUserAuthenticated();

      expect(isAuthenticated).toBe(false);
    });

    it('should return false when access token is not present', () => {
      localStorage.removeItem('access_token');

      const isAuthenticated = service.isUserAuthenticated();

      expect(isAuthenticated).toBe(false);
    });
  });
});
