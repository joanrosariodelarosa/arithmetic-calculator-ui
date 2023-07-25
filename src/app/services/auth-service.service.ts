import {Injectable} from '@angular/core';
import {HttpClientRequest} from "./http-client-request.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthService {

  constructor(private httpClientRequest: HttpClientRequest, private router: Router) {
  }

  public resetToken(): void {
    localStorage.removeItem('access_token');
  }

  login(username: string, password: string): void {
    this.resetToken();
    this.httpClientRequest.login('/operation/v1/auth', {
      username, password
    }).subscribe(res => {
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('userName', res.userName);
      this.router.navigate(['/calculator']);
    });
  }

  logout(): void {
    this.httpClientRequest.handleRequest('/operation/v1/auth/logout', null).subscribe();
    this.resetToken();
  }

  isUserAuthenticated(): boolean {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // Parse the JWT token to extract the expiration time (assuming the token is in JWT format)
      const tokenParts = accessToken.split('.');
      if (tokenParts.length === 3) {
        const payload = JSON.parse(atob(tokenParts[1]));
        const expirationTime = payload.exp * 1000; // Convert expiration time to milliseconds
        const currentTime = Date.now();
        return currentTime < expirationTime; // Check if the current time is before the token expiration time
      }
    }
    return false;
  }

}
